(this["webpackJsonppage-turners"]=this["webpackJsonppage-turners"]||[]).push([[0],{29:function(e,t,a){},42:function(e,t,a){e.exports=a.p+"static/media/bookNavIcon.7f33033a.jpg"},49:function(e,t,a){e.exports=a(79)},54:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(41),s=a.n(o),l=(a(54),a(9)),i=a(10),c=a(12),u=a(11),m=a(48),d=a(15),h=a(42),p=a.n(h);var g=function(){var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],o=t[1];function s(){o((function(e){return!e}))}return r.a.createElement("div",{className:"bookDropdownLink"},r.a.createElement("div",{className:"bookIconImg",onClick:s},r.a.createElement("a",{href:"#",className:"iconButton"},r.a.createElement("img",{src:p.a,alt:"Book Icon made into a stack | https://icons8.com/"}))),a&&r.a.createElement("ul",{className:"dropdown"},r.a.createElement("li",null,r.a.createElement(d.b,{to:"/search",className:"menuItem",onClick:s},"Search Books")),r.a.createElement("li",null,r.a.createElement(d.b,{to:"/bookshelf",className:"menuItem",onClick:s},"My Bookshelf"))))},f=a(8),b=a(47),k=(a(29),a(16)),v=a(2),E=function(){return r.a.createElement("div",{className:"intro"},r.a.createElement("h2",null,"Welcome"),r.a.createElement("p",null,"Hello! Find the books you want to read using Page Turners and keep your list as a reference."))},N=a(18),y=a(44),x=a.n(y),L=a(26),I=a.n(L);a(77);I.a.initializeApp({apiKey:"AIzaSyB-DIOv_lUD2FzybntDXIZ4dfkNPbAQx4E",authDomain:"page-turners-77a93.firebaseapp.com",databaseURL:"https://page-turners-77a93.firebaseio.com",projectId:"page-turners-77a93",storageBucket:"page-turners-77a93.appspot.com",messagingSenderId:"307533137550",appId:"1:307533137550:web:ea7f05d270d236f4966bdf"});var C=I.a,w=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={charLimit:e.charLimit},n.initialState=n.state,n}return Object(i.a)(a,[{key:"getReadMoreContent",value:function(){var e=this.state.charLimit,t=this.props,a=t.children,n=t.readMoreText,o=t.readLessText;return a.length>e?r.a.createElement("span",{className:"short-text"},a.substr(0,e),"...",r.a.createElement("span",{className:"readMoreText",style:{color:"#FFF",cursor:"pointer","text-transform":"uppercase",background:"#637192",margin:"5px"},role:"presentation",onClick:this.showLongText.bind(this)},n)):a.length<e?r.a.createElement("span",{className:"short-text"},a):r.a.createElement("span",{className:"short-text"},a,r.a.createElement("span",{className:"readMoreText",style:{color:"#FFF",cursor:"pointer","text-transform":"uppercase",background:"#637192",margin:"5px"},role:"presentation",onClick:this.showShortText.bind(this)},o))}},{key:"showLongText",value:function(){var e=this.props.children;this.setState({charLimit:e.length}),this.getReadMoreContent()}},{key:"showShortText",value:function(){this.setState(this.initialState),this.getReadMoreContent()}},{key:"render",value:function(){return r.a.createElement("div",null,this.getReadMoreContent())}}]),a}(r.a.Component);w.defaultProps={charLimit:150,readMoreText:"Read more",readLessText:"Read less"};var O=w,S=a(14),j=a(45),R=function(e){var t=r.a.createElement(f.a,{icon:S.b,size:"3x",className:"bookmark"}),a=r.a.createElement(f.a,{icon:j.a,size:"2x"});return r.a.createElement("div",{className:"book"},r.a.createElement("h3",{className:"title"},e.title),r.a.createElement("div",{className:"imageContainer bookImage"},r.a.createElement("img",{src:e.thumbnail,alt:e.title})),r.a.createElement("div",{className:"writtenInfo info"},e.isAdded?r.a.createElement("span",{className:"bookmark"},t):r.a.createElement("span",{className:"bookmark"},a),r.a.createElement("p",{className:"author"},e.authors),r.a.createElement("p",null,"Genre: ",e.genre?"".concat(e.genre):"Not available"),r.a.createElement("p",null,"Rating: ",e.rating?"".concat(e.rating,"/5"):"Not available")),e.description?r.a.createElement("div",{className:"bookDescription blurb"},r.a.createElement(O,{charLimit:200,readMoreText:" read more \u25bc",readLessText:" read less \u25b2",readMoreClassName:"read-more-less--more",readLessClassName:"read-more-less--less"},e.description)):null)},B=a(46),T=a.n(B),A=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).searchIcon=r.a.createElement(f.a,{icon:S.c,size:"1x"}),e.findBooks=function(t){x()({url:"https://www.googleapis.com/books/v1/volumes?",method:"GET",responseType:"JSON",params:{key:"AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E",q:t,maxResults:40}}).then((function(t){var a=t.data.items;e.setState({books:a})})).catch((function(e){alert(e)}))},e.handleChange=function(t){e.setState({userInput:t.target.value})},e.handleSearchClick=function(){if(e.state.userInput){var t=e.state.userInput;e.findBooks(t),e.setState({userInput:""})}},e.addFirstBook=function(t,a){C.database().ref("readingList").push(t),e.setState({books:e.state.books.map((function(e,t){if(t!==a)return e;var n=Object(N.a)({},e);return n.isAdded=!0,n}))})},e.findMatches=function(t,a){var n=C.database().ref("readingList");n.once("value",(function(r){var o,s=r.val(),l=Object.values(s),i=Object.values(l),c=[];(i.map((function(e){return c.push(e.identity),c})),c.includes(t.identity))?(o=t.imageLinks?t.imageLinks.thumbnail:"https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png",T.a.fire({title:"Oops...",imageUrl:o,imageWidth:400,imageHeight:400,text:"It looks like you have already added  ".concat(t.title," to your bookshelf"),confirmButtonText:"Cool"})):(n.push(t),e.setState({books:e.state.books.map((function(e,t){if(t!==a)return e;var n=Object(N.a)({},e);return n.isAdded=!0,n}))}))}))},e.handleClickAdd=function(t){var a=C.database().ref("readingList"),n=e.state.books[t].volumeInfo,r=n.title,o=n.authors,s=n.description,l=n.categories,i=n.averageRating,c=n.imageLinks,u={title:r,author:o&&o.length>1?o.join(", "):o,description:s,genre:l,rating:i,imageLinks:c,isRead:!1,identity:e.state.books[t].id};for(var m in u)void 0===u[m]&&delete u[m];a.once("value",(function(a){a.val()?e.findMatches(u,t):e.addFirstBook(u,t)}))},e.handleKeyPress=function(t){if("Enter"===t.key){if(!e.state.userInput)return;var a=e.state.userInput;e.findBooks(a),e.setState({userInput:""})}},e.state={books:[],userInput:""},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"inputSearch"},r.a.createElement("label",{className:"visuallyHidden"},"Search a book by title or author"),r.a.createElement("input",{type:"text",placeholder:"Title / Author",value:this.state.userInput,onChange:this.handleChange,onKeyPress:this.handleKeyPress,name:"userInput"}),r.a.createElement("button",{className:"searchButton",onClick:this.handleSearchClick},this.searchIcon)),this.state.books?r.a.createElement("ul",{className:"bookSearch"},this.state.books.map((function(t,a){var n=t.volumeInfo,o=n.title,s=n.authors,l=n.description,i=n.categories,c=n.averageRating,u=n.imageLinks;return r.a.createElement("li",{className:"listResult",key:a},r.a.createElement(R,{key:a,title:o,authors:s&&s.length>1?s.join(", "):s,description:l,genre:i,isAdded:t.isAdded,rating:c,thumbnail:u?u.thumbnail:"https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png",handleClickAdd:e.handleClickAdd}),r.a.createElement("button",{className:t.isAdded?"toggledButton":null,onClick:function(){return e.handleClickAdd(a)}},t.isAdded?"Added":"Add Book"))}))):r.a.createElement("h2",null,"There were no matches, please try again"))}}]),a}(n.Component),M=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).bookReader=r.a.createElement(f.a,{icon:S.a,size:"1x"}),e.toggleRead=function(e){var t=C.database().ref("readingList");t.once("value",(function(a){a.val()[e].isRead?t.child(e).update({isRead:!1}):t.child(e).update({isRead:!0})}))},e.deleteBook=function(e){C.database().ref("readingList").child(e).remove()},e.state={readingList:[]},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;C.database().ref("readingList").on("value",(function(t){var a=t.val(),n=[];for(var r in a)n.push(Object(N.a)({uniqueId:r},a[r]));e.setState({readingList:n})}))}},{key:"render",value:function(){var e=this,t=this.state.readingList.filter((function(e){return e.isRead})).length;return r.a.createElement("div",null,r.a.createElement("h2",null,this.bookReader," Bookshelf "),r.a.createElement("p",null,"You have read ",t," out of ",this.state.readingList.length," "),r.a.createElement("ul",null,this.state.readingList.map((function(t,a){return r.a.createElement("li",{key:a,className:"book bookListing"},r.a.createElement("h3",{className:"title"},t.title?"".concat(t.title):"Not available"),r.a.createElement("div",{className:"imageContainer bookImage"},r.a.createElement("img",{src:t.imageLinks?t.imageLinks.thumbnail:"https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png",alt:t.title})),r.a.createElement("div",{className:"writtenInfo info"},r.a.createElement("p",null,"Author: ",t.author?"".concat(t.author):"Not available"),r.a.createElement("p",null,"Genre: ",t.genre?"".concat(t.genre):"Not available"),r.a.createElement("p",null,"Rating: ",t.rating?"".concat(t.rating,"/5"):"Not available")),t.description?r.a.createElement("div",{className:"bookDescription blurb"},r.a.createElement(O,{className:"moreOrLess",charLimit:200,readMoreText:" read more \u25bc",readLessText:" read less \u25b2",readMoreClassName:"read-more-less--more",readLessClassName:"read-more-less--less"},t.description)):null,r.a.createElement("button",{className:"readButton ".concat(t.isRead?"toggledButton":null),onClick:function(){return e.toggleRead(t.uniqueId)}},t.isRead?"Mark as Unread":"Mark as Read"),r.a.createElement("button",{className:"delButton",onClick:function(){return e.deleteBook(t.uniqueId)}},"Delete"))}))))}}]),a}(n.Component),F=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).github=r.a.createElement(f.a,{icon:b.a,size:"1x"}),e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement(k.a,{className:"h1",color:"#f1f8f8",during:1200},r.a.createElement(d.b,{to:"/page-turners",className:"pageTitle"},r.a.createElement("h1",null,"Page Turners"))),r.a.createElement(g,null)),r.a.createElement("main",null,r.a.createElement("div",{className:"wrapper"},r.a.createElement(v.a,{exact:!0,path:"/page-turners",component:E}),r.a.createElement(v.a,{exact:!0,path:"/search",component:A}),r.a.createElement(v.a,{exact:!0,path:"/bookshelf",component:M}))),r.a.createElement("footer",null,r.a.createElement("div",{className:"groupMembers"},r.a.createElement("h3",null,"Group Project By:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(k.a,{color:"#f1f8f8",during:1200},r.a.createElement("a",{href:"https://github.com/daibhidhdwaum"},this.github," daibhidhdwaum"))),r.a.createElement("li",null,r.a.createElement(k.a,{color:"#f1f8f8",during:1200},r.a.createElement("a",{href:"https://github.com/vigyan-k"},this.github," vigyan-k"))),r.a.createElement("li",null,r.a.createElement(k.a,{color:"#f1f8f8",during:1200},r.a.createElement("a",{href:"https://github.com/OksanaSam"},this.github," OksanaSam"))),r.a.createElement("li",null,r.a.createElement(k.a,{color:"#f1f8f8",during:1200},r.a.createElement("a",{href:"https://github.com/amay-zingg"},this.github," amay-zingg"))))))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.8729e680.chunk.js.map