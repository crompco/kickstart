<template>
    <div class="ks-tabs" :class="{ scrollable }">
        <div class="ks-tabs-title-bar-wrapper" :class="classWrapperObj">
            <template v-if="scrollable">
                <button
                    v-show="can_scroll_left"
                    type="button"
                    class="ks-tabs-scroll-arrow ks-tabs-scroll-arrow-left"
                    aria-label="Scroll tabs left"
                    @click="scrollLeft"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 20 20">
                        <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/>
                    </svg>
                </button>
                <button
                    v-show="can_scroll_right"
                    type="button"
                    class="ks-tabs-scroll-arrow ks-tabs-scroll-arrow-right"
                    aria-label="Scroll tabs right"
                    @click="scrollRight"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 20 20">
                        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
                    </svg>
                </button>
            </template>

            <ul ref="tabs" class="ks-tabs-title-bar" :class="classObj">
                <li v-for="tab in tabs" :class="{'selected-tab': tab.active}">
                    <a :href="'#' + tab.title"
                       @click.prevent="setActiveTab(tab)"
                    >
                        {{tab.title}}
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
    export default {
        name: 'KsTabs',

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

        data() {
            return {
                tab: '',
                activeTab: null,
                tabs: [],
                sessionTab: null,
                classObj: {
                    "expand": this.expand,
                    "title-right": this.align === 'right',
                    "title-center": this.align === 'center',
                    "title-left": this.align === 'left'
                },
                classWrapperObj: {
                    'show': false
                },
                can_scroll_left: false,
                can_scroll_right: false,
                resize_observer: null,
            };
        },

        computed: {
            hasTabCacheEnabled() {
                return this.rememberTab && this.id && sessionStorage ? true : false;
            }
        },

        mounted() {
            this.tabs = [];
            // If tab remembering is enabled then let's look for the active tab in the session
            if ( this.hasTabCacheEnabled ) {
                this.sessionTab = sessionStorage.getItem('ks-tabs.' + this.id);
            }

            if ( this.scrollable ) {
                this.$nextTick(this.initScrollOverflow);
            }
        },

        beforeDestroy() {
            this.$refs.tabs?.removeEventListener('scroll', this.updateScrollArrows);
            this.resize_observer?.disconnect();
        },

        methods: {
            registerTab(tab) {
                this.tabs.push(tab);
                this.checkSetTab(tab);
            },

            checkSetTab(tab) {
                if ( this.sessionTab ) {
                    if ( tab.title == this.sessionTab ) {
                        return this.setActiveTab(tab);
                    }
                } else if ( !this.activeTab ) {
                    this.setActiveTab(tab);
                }
            },

            setActiveTab(tab) {
                this.activeTab = tab.title;
                tab.setActive(true);
                this.$emit('tab-changed', tab.title);
                this.mobileShow();
                if ( this.hasTabCacheEnabled ) {
                    sessionStorage.setItem('ks-tabs.' + this.id, tab.title);
                }

                if ( this.scrollable ) {
                    this.$nextTick(this.scrollActiveTabIntoView);
                }
            },

            mobileShow() {
                let tabs = this.$el.querySelectorAll('.ks-tabs-title-bar li:not(.selected-tab)');

                if ( tabs.length > 0 ) {
                    let visible = true;
                    for ( let tab of tabs ) {
                        if ( !(tab.offsetHeight || tab.offsetHeight || tab.getClientRects().length) ) {
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
                return this.scrollTabs(-1);
            },

            scrollRight() {
                return this.scrollTabs(1);
            },

            scrollTabs(direction) {
                // scroll half the width of the title bar
                this.$refs.tabs?.scrollBy({
                    left: this.$refs.tabs.clientWidth * 0.5 * direction,
                    behavior: 'smooth'
                });
            },

            scrollActiveTabIntoView() {
                const selected_tab = this.$refs.tabs?.querySelector('li.selected-tab');
                if ( !selected_tab ) {
                    return;
                }

                const arrow_width = this.getScrollArrowWidth();
                const selected_tab_offset_left = selected_tab.offsetLeft;
                const selected_tab_offset_right = selected_tab_offset_left + selected_tab.offsetWidth;
                const visible_left = this.$refs.tabs.scrollLeft + arrow_width;
                const visible_right = this.$refs.tabs.scrollLeft + this.$refs.tabs.clientWidth - arrow_width;

                let target = null;

                // Make sure the active tab isn't masked by the scroll arrow buttons
                if ( selected_tab_offset_left < visible_left ) {
                    target = Math.max(0, selected_tab_offset_left - arrow_width);
                } else if ( selected_tab_offset_right > visible_right ) {
                    target = Math.min(
                        this.$refs.tabs.scrollWidth - this.$refs.tabs.clientWidth,
                        selected_tab_offset_right - this.$refs.tabs.clientWidth + arrow_width
                    );
                }

                if ( target !== null && target !== this.$refs.tabs.scrollLeft ) {
                    this.$refs.tabs.scrollTo({ left: target, behavior: 'smooth' });
                }
            },

            getScrollArrowWidth() {
                const arrow = this.$el?.querySelector('.ks-tabs-scroll-arrow');
                if ( !arrow ) {
                    return 0;
                }
                return parseFloat(getComputedStyle(arrow).width) || 0;
            }
        },
    }
</script>
