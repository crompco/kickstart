<template>
    <div
        class="ks-tabs"
        :class="{ scrollable }"
    >
        <div
            class="ks-tabs-title-bar-wrapper"
            :class="classWrapperObj"
        >
            <template v-if="scrollable">
                <button
                    v-show="can_scroll_left"
                    type="button"
                    aria-label="Scroll tabs left"
                    class="ks-tabs-scroll-arrow ks-tabs-scroll-arrow-left"
                    @click="scrollLeft"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 2 20 20"
                    >
                        <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/>
                    </svg>
                </button>
                <button
                    v-show="can_scroll_right"
                    type="button"
                    aria-label="Scroll tabs right"
                    class="ks-tabs-scroll-arrow ks-tabs-scroll-arrow-right"
                    @click="scrollRight"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 2 20 20"
                    >
                        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
                    </svg>
                </button>
            </template>

            <ul
                ref="tabs"
                class="ks-tabs-title-bar"
                :class="classObj"
            >
                <li
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :class="{'selected-tab': tab === active_tab}"
                >
                    <a
                        :href="'#' + tab.title"
                        @click.prevent="setActiveTab(tab)"
                    >
                        {{ tab.title }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="ks-tabs-content">
            <slot></slot>
        </div>
    </div>
</template>


<script>
    const STORAGE_PREFIX = 'ks-tabs.';

    function storage() {
        try {
            return window.sessionStorage || null;
        } catch {
            return null;
        }
    }

    export default {
        name: 'KsTabs',

        provide() {
            return {
                ksTabs: this,
            };
        },

        props: {
            expand: {
                default: false
            },

            align: {
                type: String,
                default: 'center'
            },

            id: {
                type: String,
                default: null
            },

            rememberTab: {
                type: Boolean,
                default: true
            },

            scrollable: {
                type: Boolean,
                default: false
            },
        },

        emits: ['tab-changed'],

        data() {
            return {
                tabs: [],
                active_tab: null,
                session_tab: null,
                classWrapperObj: {
                    'show': false
                },
                can_scroll_left: false,
                can_scroll_right: false,
            };
        },

        computed: {
            hasTabCacheEnabled() {
                return !!(this.rememberTab && this.id && storage());
            },

            /**
             * The title of the active tab
             */
            activeTab() {
                return this.active_tab ? this.active_tab.title : null;
            },

            classObj() {
                return {
                    "expand": this.expand,
                    "title-right": this.align === 'right',
                    "title-center": this.align === 'center',
                    "title-left": this.align === 'left'
                };
            },
        },

        created() {
            // Children register before the parent mounts, so read the remembered tab first
            if ( this.hasTabCacheEnabled ) {
                this.session_tab = storage().getItem(STORAGE_PREFIX + this.id);
            }
        },

        mounted() {
            this.resize_observer = null;

            // A remembered tab that no longer exists falls back to the first tab
            if ( !this.active_tab && this.tabs.length ) {
                this.setActiveTab(this.tabs[0]);
            }

            if ( this.scrollable ) {
                this.$nextTick(this.initScrollOverflow);
            }
        },

        beforeDestroy() {
            this.destroying = true;
            this.teardown();
        },

        beforeUnmount() {
            this.destroying = true;
            this.teardown();
        },

        methods: {
            registerTab(tab) {
                if ( this.tabs.includes(tab) ) {
                    return;
                }

                // Keep the title bar in document order when tabs are added later
                const index = this.tabs.findIndex(other => {
                    return other.$el && tab.$el && (other.$el.compareDocumentPosition(tab.$el) & Node.DOCUMENT_POSITION_PRECEDING);
                });

                if ( index === -1 ) {
                    this.tabs.push(tab);
                } else {
                    this.tabs.splice(index, 0, tab);
                }

                this.checkSetTab(tab);
            },

            unregisterTab(tab) {
                const index = this.tabs.indexOf(tab);
                if ( index === -1 ) {
                    return;
                }

                this.tabs.splice(index, 1);

                // Tabs unregister one by one when the whole set is destroyed; reselecting would overwrite the remembered tab
                if ( this.destroying ) {
                    return;
                }

                if ( this.active_tab === tab ) {
                    this.active_tab = null;

                    if ( this.tabs.length ) {
                        this.setActiveTab(this.tabs[Math.min(index, this.tabs.length - 1)]);
                    }
                }
            },

            checkSetTab(tab) {
                if ( this.session_tab ) {
                    if ( tab.title == this.session_tab ) {
                        this.setActiveTab(tab);
                    }
                } else if ( !this.active_tab ) {
                    this.setActiveTab(tab);
                }
            },

            setActiveTab(tab) {
                if ( !tab ) {
                    return;
                }

                const changed = this.active_tab !== tab;
                this.active_tab = tab;

                if ( changed ) {
                    this.$emit('tab-changed', tab.title);
                }

                this.$nextTick(this.mobileShow);

                if ( this.hasTabCacheEnabled ) {
                    storage().setItem(STORAGE_PREFIX + this.id, tab.title);
                    this.session_tab = tab.title;
                }

                if ( this.scrollable ) {
                    this.$nextTick(this.scrollActiveTabIntoView);
                }
            },

            mobileShow() {
                if ( !this.$el || !this.$el.querySelectorAll ) {
                    return;
                }

                const tabs = this.$el.querySelectorAll('.ks-tabs-title-bar li:not(.selected-tab)');

                if ( tabs.length > 0 ) {
                    let visible = true;
                    for ( const tab of tabs ) {
                        if ( !(tab.offsetHeight || tab.getClientRects().length) ) {
                            visible = false;
                            break;
                        }
                    }

                    this.classWrapperObj.show = visible == false;
                }
            },

            initScrollOverflow() {
                if ( !this.$refs.tabs ) {
                    return;
                }

                this.$refs.tabs.addEventListener('scroll', this.updateScrollArrows, { passive: true });

                if ( typeof ResizeObserver !== 'undefined' ) {
                    this.resize_observer = new ResizeObserver(this.updateScrollArrows);
                    this.resize_observer.observe(this.$refs.tabs);
                }

                this.updateScrollArrows();
                this.scrollActiveTabIntoView();
            },

            updateScrollArrows() {
                if ( !this.$refs.tabs ) {
                    return;
                }

                const { scrollLeft, scrollWidth, clientWidth } = this.$refs.tabs;
                this.can_scroll_left = scrollLeft > 1;
                this.can_scroll_right = scrollLeft + clientWidth < scrollWidth - 1;
            },

            scrollLeft() {
                this.scrollTabs(-1);
            },

            scrollRight() {
                this.scrollTabs(1);
            },

            scrollTabs(direction) {
                // Half the width of the title bar
                if ( this.$refs.tabs && this.$refs.tabs.scrollBy ) {
                    this.$refs.tabs.scrollBy({
                        left: this.$refs.tabs.clientWidth * 0.5 * direction,
                        behavior: 'smooth',
                    });
                }
            },

            scrollActiveTabIntoView() {
                const bar = this.$refs.tabs;
                const selected_tab = bar && bar.querySelector('li.selected-tab');
                if ( !selected_tab || !bar.scrollTo ) {
                    return;
                }

                const arrow_width = this.getScrollArrowWidth();
                const selected_left = selected_tab.offsetLeft;
                const selected_right = selected_left + selected_tab.offsetWidth;
                const visible_left = bar.scrollLeft + arrow_width;
                const visible_right = bar.scrollLeft + bar.clientWidth - arrow_width;

                let target = null;

                // Keep the active tab clear of the arrow buttons
                if ( selected_left < visible_left ) {
                    target = Math.max(0, selected_left - arrow_width);
                } else if ( selected_right > visible_right ) {
                    target = Math.min(bar.scrollWidth - bar.clientWidth, selected_right - bar.clientWidth + arrow_width);
                }

                if ( target !== null && target !== bar.scrollLeft ) {
                    bar.scrollTo({ left: target, behavior: 'smooth' });
                }
            },

            getScrollArrowWidth() {
                const arrow = this.$el && this.$el.querySelector('.ks-tabs-scroll-arrow');

                return arrow ? (parseFloat(getComputedStyle(arrow).width) || 0) : 0;
            },

            teardown() {
                if ( this.$refs.tabs ) {
                    this.$refs.tabs.removeEventListener('scroll', this.updateScrollArrows);
                }

                if ( this.resize_observer ) {
                    this.resize_observer.disconnect();
                    this.resize_observer = null;
                }
            },
        },

        watch: {
            scrollable(scrollable) {
                this.teardown();

                if ( scrollable ) {
                    this.$nextTick(this.initScrollOverflow);
                }
            },
        },
    }
</script>
