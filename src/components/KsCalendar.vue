<template>
    <div class="ks-calendar">
        <div class="ks-calendar-title">
	        {{month}} {{year}}
        </div>

        <div class="ks-calendar-view">
            <div class="ks-calendar-controls"></div>

	        <!-- Month -->
            <div class="ks-calendar-month">
	            <!-- Heading -->
	            <div class="cal-week cal-week-header">
		            <div v-for="title in week_titles" class="cal-day">
			            {{title}}
		            </div>
	            </div>
	            <!-- Weeks -->
	            <div class="cal-week" v-for="week in weeks">
		            <div v-for="day in week"
		                v-if="isInMonth(day)"
		                class="cal-day"
		            >
			            <span class="day-num">
				            {{day | day}}
			            </span>
			            <slot :name="formatDate(day)"></slot>
		            </div>
		            <div v-else class="cal-blank"></div>
	            </div>
            </div>
        </div>
    </div>

</template>

<script>
	import {defaultLocale, getMonthRange, getDaysInMonth, subDays} from '../helpers/dates';
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

		        return new Date(this.date);
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
			    for ( var i = 0; i < this.days.length; i++ ) {

			    	week.push(this.days[i]);
			    	if ( i == 0 ) {
			    		let day = subDays(this.days[i], 1);
			    		while ( day.getDay() != this.weekStart ) {
			    			week.unshift(day);
						    day = subDays(day, 1);
					    }
				    } else if ( this.weekStart == this.days[i].getDay() ) {
			    		weeks.push(week);
			    		week = [];
				    }
			    }
			    return weeks;
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
		    	let year = date.getFullYear();
		    	let month = date.getMonth() + 1;
		    	let day = date.getDate();

			    month = pad_left(month, '0', 2);
			    day = pad_left(day, '0', 2);

		    	return this.format.toLowerCase().replace('y', year).replace('m', month).replace('d', day);
		    },
	    }

    }
</script>
