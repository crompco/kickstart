__NUXT_JSONP__("/components/ks-timepicker", (function(a,b,c,d){return {data:[{data:{slug:"ks-timepicker",title:b,source:"PageKsTimepicker",api:{props:[{name:"timeStep",type:"Number, String",default:30,description:"The number of minutes to step through for the list of options. ***Note: This implementation assumes nice round numbers for timeStep (e.g. 15 or 30 minutes) and minTime (e.g. 9:30 am). It is not bulletproof and may produce an invalid timeOptions computed property otherwise."},{name:"timeFormat",type:a,default:"H:i",description:"The format of the value for v-model (options: h,H,i,a,A)"},{name:"displayFormat",type:a,default:"h:i A",description:"The format of the displayed time and options in the list (options: h,H,i,a,A)"},{name:"minTime",type:a,default:"04:00",description:"The minimum time for the options list"},{name:"maxTime",type:a,default:"24:00",description:"The maximum time fore the options list"},{name:"listHeight",type:a,default:"200px",description:"The height of the options list"},{name:"disabled",type:"Boolean",default:false,description:"Whether or not disable the input"}],methods:[{name:"setTime(time)",description:"Sets the time of the timepicker to the given value"},{name:"selectTimeAtIndex(index)",description:"Sets the time to the time at the given index in the list of options"},{name:"resetList()",description:"Resets the list to it's original options (removes filtering)"},{name:"resetFocus()",description:"Resets the focus of the element and closes the options"},{name:"open()",description:"Opens the list of options"},{name:"close()",description:"Closes the list of options"}]},toc:[],body:{type:"root",children:[]},dir:"\u002Fcomponents",path:c,extension:".md",createdAt:d,updatedAt:d}}],fetch:{"components:0":{components:[{title:"Accordion",path:"\u002Fcomponents\u002Fks-accordion"},{title:"Action Menu",path:"\u002Fcomponents\u002Fks-action-menu"},{title:"AutoComplete",path:"\u002Fcomponents\u002Fks-autocomplete"},{title:"Buttons",path:"\u002Fcomponents\u002Fks-button"},{title:"Calendar",path:"\u002Fcomponents\u002Fks-calendar"},{title:"Checkbox Button Groups",path:"\u002Fcomponents\u002Fks-checkbox-group"},{title:"Checkbox Buttons",path:"\u002Fcomponents\u002Fks-checkbox"},{title:"Datepicker",path:"\u002Fcomponents\u002Fks-datepicker"},{title:"Drag and Drop",path:"\u002Fcomponents\u002Fks-drag-drop"},{title:"Loader Line",path:"\u002Fcomponents\u002Fks-loader-line"},{title:"Loader Spinner",path:"\u002Fcomponents\u002Fks-loader-spinner"},{title:"Modal",path:"\u002Fcomponents\u002Fks-modal"},{title:"Paginator",path:"\u002Fcomponents\u002Fks-paginator"},{title:"Radio Button Groups",path:"\u002Fcomponents\u002Fks-radio-group"},{title:"Radio Buttons",path:"\u002Fcomponents\u002Fks-radio"},{title:"Select",path:"\u002Fcomponents\u002Fks-select"},{title:"Step Through",path:"\u002Fcomponents\u002Fks-step-through"},{title:"Tabs",path:"\u002Fcomponents\u002Fks-tabs"},{title:b,path:c},{title:"Toast",path:"\u002Fcomponents\u002Fks-toast"},{title:"Tooltip",path:"\u002Fcomponents\u002Fks-tooltip"}]}},mutations:void 0}}("String","Timepicker","\u002Fcomponents\u002Fks-timepicker","2021-03-10T18:48:29.005Z")));