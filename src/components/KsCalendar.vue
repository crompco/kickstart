<template>
    <div class="ks-calendar">
        <div class="ks-calendar-title">
	        {{month}} {{year}}
        </div>

        <div class="ks-calendar-view">
            <div class="ks-calendar-controls"></div>

            <div class="ks-calendar-month">
	            <div class="cal-week cal-week-header">
		            <div v-for="title in week_titles" class="cal-day">
			            {{title}}
		            </div>
	            </div>
	            <div class="cal-week" v-for="week in weeks">
		            <div class="cal-day" v-for="day in week">
			            <span v-if="isInMonth(day)">
				            {{day | day}}
			            </span>
			            <span v-else>
				            &nbsp;
			            </span>
		            </div>
	            </div>
            </div>
        </div>
    </div>

</template>

<script>
	import {defaultLocale, getMonthRange, getDaysInMonth, subDays} from '../helpers/dates';

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
        		let name_type = this.abbrevDay ? 'abbreviations' : 'names';
        		if ( this.weekStart == 0 ) {
			        return this.lang.days[name_type];
		        }

		        let titles = [], append = [];
		        for ( var i = 0; i < this.lang.days[name_type].length; i++ ) {
        			if ( i >= this.weekStart ) {
        				titles.push(this.lang.days[name_type][i]);
			        } else {
        				append.push(this.lang.days[name_type][i]);
			        }
		        }
		        return titles.concat(append);
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
        	setLang(lang) {
        		this.lang = lang;
	        },
		    isInMonth(day) {
        		return day.getMonth() == this.date_obj.getMonth();
		    }
	    }

    }
</script>
