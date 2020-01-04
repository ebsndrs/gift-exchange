(this["webpackJsonpsecret-santa"]=this["webpackJsonpsecret-santa"]||[]).push([[0],{11:function(e,a,t){e.exports=t(20)},19:function(e,a,t){},20:function(e,a,t){"use strict";t.r(a);var n,l=t(0),r=t.n(l),c=t(10),s=t.n(c),i=t(6),o=t.n(i),u=t(1),m=t(2),h=t(4),d=t(3),p=t(5);t(17),t(18),t(19);!function(e){e[e.none=0]="none",e[e.male=1]="male",e[e.female=2]="female",e[e.other=3]="other"}(n||(n={}));var f=t(7),v=t(8),E=function(){function e(){Object(u.a)(this,e)}return Object(m.a)(e,[{key:"getGendersAsStringArray",value:function(){for(var e=[],a=0;a<4;a++){var t=this.getGenderAsString(a);void 0!==t&&e.push(t)}return e}},{key:"getGenderAsString",value:function(e){for(var a in n)if(n[a]===e&&n.hasOwnProperty(a))return"".concat(a[0].toUpperCase()).concat(a.slice(1))}}]),e}(),g=function(e){function a(e){var t;return Object(u.a)(this,a),(t=Object(h.a)(this,Object(d.a)(a).call(this,e))).genderHelper=void 0,t.handleNameChange=function(e,a){t.props.handleNameChange(e,a.target.value)},t.handleHouseholdChange=function(e,a){t.props.handleNameChange(e,a.target.value)},t.handleAgeInput=function(e){null!==e.target.value&&/^\d+$/.test(e.target.value)||(console.log("is null or not digit"),e.preventDefault())},t.genderHelper=new E,t.handleAgeInput=t.handleAgeInput.bind(Object(v.a)(t)),t}return Object(p.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("input",{className:"input is-small",type:"text",placeholder:"Name",onChange:function(a){return e.handleNameChange(e.props.index,a)}})),r.a.createElement("td",null,r.a.createElement("div",{className:"select is-small"},r.a.createElement("select",{onChange:function(a){return e.handleHouseholdChange(e.props.index,a)}},this.props.households.map((function(e){return r.a.createElement("option",{value:e},e)}))))),r.a.createElement("td",null,r.a.createElement("div",{className:"select is-small"},r.a.createElement("select",null,this.genderHelper.getGendersAsStringArray().map((function(e){return r.a.createElement("option",null,e)}))))),r.a.createElement("td",null,r.a.createElement("input",{className:"input is-small",type:"number",placeholder:"Age",onChange:function(a){return e.handleAgeInput(a)}})),r.a.createElement("td",null))}}]),a}(r.a.Component),b=function(e){function a(e){var t;return Object(u.a)(this,a),(t=Object(h.a)(this,Object(d.a)(a).call(this,e))).genderHelper=void 0,t.addParticipant=function(){var e={name:"",household:void 0,gender:void 0,age:void 0,exclusions:void 0};t.props.addParticipant(e)},t.handleParticipantNameChange=function(e,a){t.props.handleParticipantNameChange(e,a)},t.handleParticipantHouseholdChange=function(e,a){t.props.handleParticipantHouseholdChange(e,a)},t.genderHelper=new E,t}return Object(p.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e=this,a=Object(f.a)(this.props.households);a.every((function(e){return void 0===e}))?a=["None"]:a.unshift("None");var t=Array.from(new Set(a)),n=this.genderHelper.getGendersAsStringArray();return r.a.createElement("div",null,r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Household"),r.a.createElement("th",null,"Gender"),r.a.createElement("th",null,"Age"),r.a.createElement("th",null,"Exlusions"))),r.a.createElement("tbody",null,this.props.participants.map((function(a){return r.a.createElement(g,{index:e.props.participants.indexOf(a),participant:a,households:t,genders:n,handleNameChange:e.handleParticipantNameChange,handleHouseholdChange:e.handleParticipantHouseholdChange})})))),r.a.createElement("button",{className:"button",onClick:this.addParticipant},"Add Participant"))}}]),a}(r.a.Component),N=function(){function e(){Object(u.a)(this,e)}return Object(m.a)(e,[{key:"generateMatches",value:function(e,a){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.enforceHouseholdRule||a.enforceAgeGroupRule||a.enforceGenderRule||a.enforceCircularGiftingRule||a.enforcePreviousYearsRule){t.next=4;break}return t.abrupt("return",this.simpleMatch(e));case 4:return t.abrupt("return",this.complexMatch(e,a));case 5:case"end":return t.stop()}}),null,this)}},{key:"simpleMatch",value:function(e){for(var a=[],t=Object(f.a)(e),n=0;n<e.length;n++){for(var l=this.randomIndex(t.length);l===n;)l=this.randomIndex(t.length);a.push({giver:e[n],receiver:t[l]}),t.splice(l,1)}return a}},{key:"complexMatch",value:function(e,a){for(var t=this,l=[],r=Object(f.a)(e),c=function(c){var s=[];s.push(c);var i=t.randomIndex(r.length,s);if(a.enforceHouseholdRule)for(;e[c].household===r[i].household&&s.length<r.length;)s.push(i),i=t.randomIndex(r.length,s);if(a.enforceAgeGroupRule,a.enforceGenderRule&&e[c].gender!==n.other)for(;e[c].gender===r[i].gender&&s.length<r.length;)s.push(i),i=t.randomIndex(r.length,s);if(a.enforceCircularGiftingRule){var o=l.find((function(e){return e.giver===r[i]}));void 0!==o&&o.receiver===e[c]&&s.length<r.length&&(s.push(i),i=t.randomIndex(r.length,s))}if(a.enforcePreviousYearsRule,s.length>r.length)return console.log("Match is impossible with supplied rules"),{v:[]};l.push({giver:e[c],receiver:r[i]}),r.splice(i,1)},s=0;s<e.length;s++){var i=c(s);if("object"===typeof i)return i.v}return l}},{key:"randomIndex",value:function(e,a){e=Math.ceil(e);var t=Math.floor(Math.random()*e);if(void 0!==a)for(;a.includes(t);)t=Math.floor(Math.random()*e);return t}}]),e}(),C=function(e){function a(){return Object(u.a)(this,a),Object(h.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(p.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e;return r.a.createElement("div",null,r.a.createElement("p",null,this.props.match.giver.name," gives to ",null===(e=this.props.match.receiver)||void 0===e?void 0:e.name))}}]),a}(r.a.Component),x=function(e){function a(e){var t;Object(u.a)(this,a),(t=Object(h.a)(this,Object(d.a)(a).call(this,e))).matchService=void 0,t.addParticipant=function(e){var a=t.state.participants;a.push(e),t.setState({participants:a})},t.handleParticipantNameChange=function(e,a){var n=t.state.participants;n[e].household=a,t.setState({participants:n})},t.handleParticipantHouseholdChange=function(e,a){var n=t.state.participants;"None"===a?n[e].household=void 0:t.state.households.includes(a)?(n[e].household=a,t.setState({participants:n})):console.error("Household does not exist")},t.generateMatches=function(){var e;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(t.matchService.generateMatches(t.state.participants,t.state.rules));case 2:e=a.sent,t.setState({matches:e});case 4:case"end":return a.stop()}}))},t.toggleHouseholdRule=function(){var e=t.state;e.rules.enforceHouseholdRule=!e.rules.enforceHouseholdRule,t.setState({rules:e.rules})},t.toggleCircularGiftingRule=function(){var e=t.state;e.rules.enforceCircularGiftingRule=!e.rules.enforceCircularGiftingRule,t.setState({rules:e.rules})},t.toggleGenderRule=function(){var e=t.state;e.rules.enforceGenderRule=!e.rules.enforceGenderRule,t.setState({rules:e.rules})},t.togglePreviousYearsRule=function(){var e=t.state;e.rules.enforcePreviousYearsRule=!e.rules.enforcePreviousYearsRule,t.setState({rules:e.rules})},t.matchService=new N;var l=["Household 1","Household 2","Household 3"];n.male,n.male,n.female,n.other,n.female,n.male,n.male,n.female,n.female,n.other;return t.state={participants:[],households:l,matches:[],previousYears:[],rules:{enforceHouseholdRule:!1,enforceAgeGroupRule:!1,enforceGenderRule:!1,enforceCircularGiftingRule:!1,enforcePreviousYearsRule:!1,previousYearsToEnforce:3}},t}return Object(p.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("section",{className:"hero is-dark"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("nav",{className:"level"},r.a.createElement("div",{className:"level-left"},r.a.createElement("div",{className:"level-item"},r.a.createElement("h1",{className:"title"},"Secret Santa"))),r.a.createElement("div",{className:"level-right"},r.a.createElement("div",{className:"level-item"},r.a.createElement("span",{className:"icon is-large"},r.a.createElement("a",{href:"https://github.com/ebsndrs/secret-santa",className:"github-link"},r.a.createElement("i",{className:"fab fa-2x fa-github"})))))))),r.a.createElement("section",{className:"section",id:"participantsSection"},r.a.createElement("div",{className:"box"},r.a.createElement("h1",{className:"title is-4"},"Participants"),r.a.createElement("h1",{className:"subtitle is-6"},"Add, remove, edit, or import participants"),r.a.createElement(b,{households:this.state.households,participants:this.state.participants,addParticipant:this.addParticipant,handleParticipantNameChange:this.handleParticipantNameChange,handleParticipantHouseholdChange:this.handleParticipantHouseholdChange}))),r.a.createElement("footer",{className:"footer"},r.a.createElement("div",{className:"content has-text-centered"},r.a.createElement("p",null,r.a.createElement("strong",null,"Secret Santa")," by ",r.a.createElement("a",{href:"http://ebsndrs.io"},"Edward Sanders")))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("section",{className:"section"},r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"panel"},r.a.createElement("p",{className:"panel-heading"},"Rules"),r.a.createElement("div",{className:"panel-block"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"level"},r.a.createElement("div",{className:"level-left"},r.a.createElement("div",{className:"level-item"},r.a.createElement("h5",{className:"title is-5"},"Prevent Household Matches ",r.a.createElement("sup",{className:"tooltip"},r.a.createElement("span",{title:"This rule prevents matches from occuring within the same household. Enabling ensures givers will only give to those outside of their household.",className:"icon is-small"},r.a.createElement("i",{className:"far fa-question-circle"})))))),r.a.createElement("div",{className:"level-right"},r.a.createElement("div",{className:"level-item"},r.a.createElement("button",{className:"button is-white is-rounded",onClick:this.toggleHouseholdRule},r.a.createElement("span",{className:"icon is-medium"},r.a.createElement("i",{className:this.state.rules.enforceHouseholdRule?"far fa-2x fa-check-circle has-text-success":"far fa-2x fa-times-circle has-text-danger"})))))),r.a.createElement("div",{className:"level"},r.a.createElement("div",{className:"level-left"},r.a.createElement("div",{className:"level-item"},r.a.createElement("div",{className:"content"},r.a.createElement("h5",{className:"title is-5"},"Prevent Circular Matches ",r.a.createElement("sup",{className:"tooltip"},r.a.createElement("span",{title:"This rule prevents participants from having a circular gift exchange, where a giver and receiver are giving and receiver from each other. Enabling this rule ensures nobody will give to the person from which they receive, and vice versa.",className:"icon is-small"},r.a.createElement("i",{className:"far fa-question-circle"}))))))),r.a.createElement("div",{className:"level-right"},r.a.createElement("div",{className:"level-item"},r.a.createElement("button",{className:"button is-white is-rounded",onClick:this.toggleCircularGiftingRule},r.a.createElement("span",{className:"icon is-medium"},r.a.createElement("i",{className:this.state.rules.enforceCircularGiftingRule?"far fa-2x fa-check-circle has-text-success":"far fa-2x fa-times-circle has-text-danger"})))))),r.a.createElement("div",{className:"level"},r.a.createElement("div",{className:"level-left"},r.a.createElement("div",{className:"level-item"},r.a.createElement("h5",{className:"title is-5"},"Prevent Same Gender Matches ",r.a.createElement("sup",{className:"tooltip"},r.a.createElement("span",{title:"This rule prevents matches from occuring between genders. This only prevents those with their gender defined as male or female from giving to each other; those with the 'other' gender are not affected",className:"icon is-small"},r.a.createElement("i",{className:"far fa-question-circle"})))))),r.a.createElement("div",{className:"level-right"},r.a.createElement("div",{className:"level-item"},r.a.createElement("button",{className:"button is-white is-rounded",onClick:this.toggleGenderRule},r.a.createElement("span",{className:"icon is-medium"},r.a.createElement("i",{className:this.state.rules.enforceGenderRule?"far fa-2x fa-check-circle has-text-success":"far fa-2x fa-times-circle has-text-danger"})))))))))),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"panel"},r.a.createElement("p",{className:"panel-heading"},"Participants"),r.a.createElement("div",{className:"panel-block"}))),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"panel"},r.a.createElement("p",{className:"panel-heading"},"Matches"),r.a.createElement("div",{className:"panel-block"}))))),r.a.createElement("div",null,r.a.createElement("h1",{className:"title"},"Rules"),r.a.createElement("div",{className:"field"},r.a.createElement("label",{className:"checkbox"},r.a.createElement("input",{type:"checkbox",checked:this.state.rules.enforceHouseholdRule,onClick:this.toggleHouseholdRule}),"Household Rule")),r.a.createElement("div",{className:"field"},r.a.createElement("label",{className:"checkbox"},r.a.createElement("input",{type:"checkbox",checked:this.state.rules.enforceCircularGiftingRule,onClick:this.toggleCircularGiftingRule}),"Circular Gifting Rule")),r.a.createElement("div",{className:"field"},r.a.createElement("label",{className:"checkbox"},r.a.createElement("input",{type:"checkbox",checked:this.state.rules.enforceGenderRule,onClick:this.toggleGenderRule}),"Gender Rule"))),r.a.createElement("div",null,r.a.createElement("h2",{className:"title"},"Households"),this.state.households.map((function(e){return r.a.createElement("p",null,e)}))),r.a.createElement("div",null,r.a.createElement("h2",{className:"title"},"Participants"),r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Household"),r.a.createElement("th",null,"Gender"))),r.a.createElement("tbody",null,this.state.participants.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.household))}))))),r.a.createElement("button",{className:"button",onClick:this.generateMatches},"Generate Matches"),this.state.matches.map((function(e){return r.a.createElement(C,{match:e})})))}}]),a}(r.a.Component);s.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.f14ad069.chunk.js.map