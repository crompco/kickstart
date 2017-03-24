<template>
    <div class="ks-calendar">
        <div class="ks-calendar-title">
	        {{month}} {{year}}
        </div>

        <div
	        class="ks-calendar-view"
			:class="{'interactive': interactive}"
        >
            <div class="ks-calendar-controls">
	            <button>&lt;</button>
	            {{month}} {{year}}
	            <button>&gt;</button>
            </div>

	        <!-- Month -->
            <div class="ks-calendar-month">
	            <!-- Heading -->
	            <div class="cal-week cal-week-header">
		            <div v-for="title in week_titles" class="cal-day">
			            {{title}}
		            </div>
	            </div>
	            <!-- Weeks -->
	            <div class="cal-week" v-for="week in weeks" :style="week_style">

		             <div v-for="day in week"
		                v-if="isInMonth(day)"
		                class="cal-day"
						@click.prevent="$emit('select', formatDate(day))"
		            >
			            <div>
				            <span class="day-num">
					            {{day | day}}
				            </span>
				            <slot :name="formatDate(day)"></slot>
			            </div>
		            </div>

		            <div v-else class="cal-blank"></div>

	            </div>
            </div>
        </div>
    </div>

</template>

<script>
	import {
		defaultLocale,
		getMonthRange,
		getDaysInMonth,
		addDays,
		subDays,
		formatDate,
		parseDate
	} from '../helpers/dates';
	import {pad_left} from '../helpers/strings';

    export default {
        name: 'KsCalendar',

        props: {
        	date: {
        		type: [String, Date],
		        default() {
        			return new Date();
		        }
	        },
	        weekStart: {
        		type: [String, Number],
		        default: 0
	        },
	        abbrevDay: {
        		type: Boolean,
		        default: true
	        },
	        abbrevMonth: {
        		type: Boolean,
		        default: false
	        },
	        format: {
        		type: String,
		        default: "y-m-d"
	        },
	        weekHeight: {
        		type: String,
		        default: 'auto'
	        },
	        interactive: {
        		type: Boolean,
		        default: true
	        }
        },

        data() {
            return {
            	lang: defaultLocale,
	            first_day: '',
	            last_day: ''
            };
        },

	    computed: {
        	date_obj() {
        		if ( this.date instanceof Date ) {
        			return this.date;
		        }

		        return parseDate(this.date, this.format);
	        },
        	month() {
        		return this.lang.months.names[this.date_obj.getMonth()];
	        },
		    month_abbrev() {
			    return this.lang.months.abbreviations[this.date_obj.getMonth()];
		    },
		    year() {
        		return this.date_obj.getFullYear();
		    },
		    week_titles() {
        		let titles = this.lang.days[this.abbrevDay ? 'abbreviations' : 'names']
        		if ( this.weekStart == 0 ) {
			        return titles;
		        }

			    return titles.slice(this.weekStart).concat(titles.slice(0, this.weekStart));
		    },
		    days() {
        		return getDaysInMonth(this.date_obj.getMonth(), this.date_obj.getFullYear());
		    },
		    weeks() {
        		let weeks = [], week = [];

        		// Pre fill the previous days in the week
			    if ( this.weekStart != this.days[0].getDay() ) {
				    let day = this.days[0];

				    do {
					    day = subDays(day, 1);
					    week.unshift(day);
				    } while ( day.getDay() != this.weekStart );
			    }

			    // Push the first day
			    week.push(this.days[0]);

			    // Run through the other days
			    for ( var i = 1; i < this.days.length; i++ ) {
				    if ( this.weekStart == this.days[i].getDay() ) {
					    weeks.push(week);
					    week = [];
				    }

				    week.push(this.days[i]);
			    }

			    // Attach the remaining days
			    if ( week.length ) {
			    	let day = this.days[this.days.length-1];
			    	while ( week.length < 7 ) {
					    day = addDays(day, 1);
			    		week.push(day);
				    }
				    weeks.push(week);
			    }

			    return weeks;
		    },
		    week_style() {
        		if ( 'auto' == this.weekHeight ) {
        			return {};
		        }

        		return {
        			'min-height': this.weekHeight
		        }
		    }
	    },

	    mounted() {

	    },

	    filters: {
        	day(day) {
        		return day.getDate();
	        }
	    },

	    methods: {
		    /**
		     * Set the language info
		     *
		     * @param lang
		     */
		    setLang(lang) {
        		this.lang = lang;
	        },

		    /**
		     * Checks if the day is in the current month
		     *
		     * @param day
		     * @return {boolean}
		     */
		    isInMonth(day) {
        		return day.getMonth() == this.date_obj.getMonth();
		    },

		    /**
		     * Formats a date
		     * @param date
		     * @return {string}
		     */
		    formatDate(date) {
		    	return formatDate(date, this.format);
		    },
	    }

    }
</script>
