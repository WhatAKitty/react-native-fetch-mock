var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _status=Symbol('status');var _data=Symbol('data');var _statusText=Symbol('statusText');var Response=function(){function Response(_ref){var status=_ref.status,_ref$data=_ref.data,data=_ref$data===void 0?{}:_ref$data,_ref$statusText=_ref.statusText,statusText=_ref$statusText===void 0?'':_ref$statusText;(0,_classCallCheck2.default)(this,Response);this[_status]=status;this[_data]=data;this[_statusText]=statusText;}(0,_createClass2.default)(Response,[{key:"text",value:function text(){try{return Promise.resolve(JSON.stringify(this[_data]));}catch(err){return Promise.reject(new Error('failed text invoke.'));}}},{key:"json",value:function json(){return this[_data];}},{key:"status",get:function get(){return this[_status];}},{key:"statusText",get:function get(){return this[_statusText];}},{key:"ok",get:function get(){if(this.status>=200&&this.status<300){return true;}else{return false;}}}]);return Response;}();var _default=Response;exports.default=_default;