(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isb=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isr)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="b"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="p"){processStatics(init.statics[b2]=b3.p,b4)
delete b3.p}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.dw"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.dw"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.dw(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.dy=function(){}
var dart=[["","",,H,{"^":"",o0:{"^":"b;a"}}],["","",,J,{"^":"",
O:function(a){return void 0},
dD:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cE:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dB==null){H.mI()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.a(P.c7("Return interceptor for "+H.l(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cY()]
if(v!=null)return v
v=H.mN(a)
if(v!=null)return v
if(typeof a=="function")return C.O
y=Object.getPrototypeOf(a)
if(y==null)return C.z
if(y===Object.prototype)return C.z
if(typeof w=="function"){Object.defineProperty(w,$.$get$cY(),{value:C.q,enumerable:false,writable:true,configurable:true})
return C.q}return C.q},
r:{"^":"b;",
u:function(a,b){return a===b},
gU:function(a){return H.bM(a)},
i:["en",function(a){return"Instance of '"+H.bd(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintSize|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPreserveAspectRatio|SVGUnitTypes|Screen|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TextMetrics|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageParameters|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContext|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLBuffer|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
hY:{"^":"r;",
i:function(a){return String(a)},
gU:function(a){return a?519018:218159},
$isai:1},
ee:{"^":"r;",
u:function(a,b){return null==b},
i:function(a){return"null"},
gU:function(a){return 0},
$isG:1},
cZ:{"^":"r;",
gU:function(a){return 0},
i:["eo",function(a){return String(a)}]},
iH:{"^":"cZ;"},
c8:{"^":"cZ;"},
c3:{"^":"cZ;",
i:function(a){var z=a[$.$get$e_()]
if(z==null)return this.eo(a)
return"JavaScript function for "+H.l(J.ab(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$iscV:1},
b9:{"^":"r;$ti",
h:function(a,b){H.z(b,H.y(a,0))
if(!!a.fixed$length)H.t(P.C("add"))
a.push(b)},
S:function(a,b){var z
if(!!a.fixed$length)H.t(P.C("remove"))
for(z=0;z<a.length;++z)if(J.P(a[z],b)){a.splice(z,1)
return!0}return!1},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[H.y(a,0)]})
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.a(P.b4(a))}},
E:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.m(z,y,H.l(a[y]))
return z.join(b)},
hH:function(a){return this.E(a,"")},
hz:function(a,b,c,d){var z,y,x
H.z(b,d)
H.h(c,{func:1,ret:d,args:[d,H.y(a,0)]})
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.a(P.b4(a))}return y},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
bK:function(a,b,c){if(b<0||b>a.length)throw H.a(P.a0(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw H.a(P.a0(c,b,a.length,"end",null))
if(b===c)return H.e([],[H.y(a,0)])
return H.e(a.slice(b,c),[H.y(a,0)])},
gaA:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(H.hW())},
az:function(a,b,c,d){var z
H.z(d,H.y(a,0))
if(!!a.immutable$list)H.t(P.C("fill range"))
P.aM(b,c,a.length,null,null,null)
for(z=b;z.O(0,c);z=z.D(0,1))a[z]=d},
bq:function(a,b){var z
for(z=0;z<a.length;++z)if(J.P(a[z],b))return!0
return!1},
i:function(a){return P.cW(a,"[","]")},
ga0:function(a){return new J.az(a,a.length,0,[H.y(a,0)])},
gU:function(a){return H.bM(a)},
gl:function(a){return a.length},
sl:function(a,b){if(!!a.fixed$length)H.t(P.C("set length"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(P.cf(b,"newLength",null))
if(b<0)throw H.a(P.a0(b,0,null,"newLength",null))
a.length=b},
k:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aG(a,b))
if(b>=a.length||b<0)throw H.a(H.aG(a,b))
return a[b]},
m:function(a,b,c){H.D(b)
H.z(c,H.y(a,0))
if(!!a.immutable$list)H.t(P.C("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aG(a,b))
if(b>=a.length||b<0)throw H.a(H.aG(a,b))
a[b]=c},
$isk:1,
$isc:1,
p:{
hX:function(a,b){if(typeof a!=="number"||Math.floor(a)!==a)throw H.a(P.cf(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.a(P.a0(a,0,4294967295,"length",null))
return J.ec(new Array(a),b)},
ec:function(a,b){return J.bE(H.e(a,[b]))},
bE:function(a){H.bZ(a)
a.fixed$length=Array
return a}}},
o_:{"^":"b9;$ti"},
az:{"^":"b;a,b,c,0d,$ti",
gT:function(a){return this.d},
I:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.a(H.A(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c1:{"^":"r;",
ghG:function(a){return a===0?1/a<0:a<0},
dN:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.a(P.C(""+a+".floor()"))},
ab:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.a(P.C(""+a+".round()"))},
ed:function(a,b){var z
if(b>20)throw H.a(P.a0(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.ghG(a))return"-"+z
return z},
bb:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.a(P.a0(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.X(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.t(P.C("Unexpected toString result: "+z))
x=J.aH(y)
z=x.k(y,1)
w=+x.k(y,3)
if(x.k(y,2)!=null){z+=x.k(y,2)
w-=x.k(y,2).length}return z+C.b.j("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gU:function(a){return a&0x1FFFFFFF},
j:function(a,b){if(typeof b!=="number")throw H.a(H.ah(b))
return a*b},
bg:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
er:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.de(a,b)},
a3:function(a,b){return(a|0)===a?a/b|0:this.de(a,b)},
de:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.a(P.C("Result of truncating division is "+H.l(z)+": "+H.l(a)+" ~/ "+b))},
aJ:function(a,b){var z
if(a>0)z=this.dc(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
fL:function(a,b){if(b<0)throw H.a(H.ah(b))
return this.dc(a,b)},
dc:function(a,b){return b>31?0:a>>>b},
O:function(a,b){if(typeof b!=="number")throw H.a(H.ah(b))
return a<b},
$isq:1,
$isX:1},
ed:{"^":"c1;",$ism:1},
hZ:{"^":"c1;"},
c2:{"^":"r;",
X:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aG(a,b))
if(b<0)throw H.a(H.aG(a,b))
if(b>=a.length)H.t(H.aG(a,b))
return a.charCodeAt(b)},
H:function(a,b){if(b>=a.length)throw H.a(H.aG(a,b))
return a.charCodeAt(b)},
D:function(a,b){H.M(b)
if(typeof b!=="string")throw H.a(P.cf(b,null,null))
return a+b},
aT:function(a,b,c,d){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)H.t(H.ah(b))
c=P.aM(b,c,a.length,null,null,null)
if(typeof c!=="number"||Math.floor(c)!==c)H.t(H.ah(c))
z=a.substring(0,b)
y=a.substring(c)
return z+d+y},
a6:function(a,b,c){var z
if(typeof c!=="number"||Math.floor(c)!==c)H.t(H.ah(c))
if(typeof c!=="number")return c.O()
if(c<0||c>a.length)throw H.a(P.a0(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
a5:function(a,b){return this.a6(a,b,0)},
v:function(a,b,c){H.D(c)
if(typeof b!=="number"||Math.floor(b)!==b)H.t(H.ah(b))
if(c==null)c=a.length
if(typeof b!=="number")return b.O()
if(b<0)throw H.a(P.cu(b,null,null))
if(b>c)throw H.a(P.cu(b,null,null))
if(c>a.length)throw H.a(P.cu(c,null,null))
return a.substring(b,c)},
aB:function(a,b){return this.v(a,b,null)},
j:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.a(C.E)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
hU:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.j(c,z)+a},
a9:function(a,b){return this.hU(a,b," ")},
dV:function(a,b,c){var z
if(c<0||c>a.length)throw H.a(P.a0(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
dU:function(a,b){return this.dV(a,b,0)},
ho:function(a,b,c){if(c>a.length)throw H.a(P.a0(c,0,a.length,null,null))
return H.h3(a,b,c)},
i:function(a){return a},
gU:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gl:function(a){return a.length},
$iset:1,
$isi:1}}],["","",,H,{"^":"",
cF:function(a){var z,y
z=a^48
if(z<=9)return z
y=a|32
if(97<=y&&y<=102)return y-87
return-1},
hW:function(){return new P.jk("No element")},
a5:{"^":"jR;a",
gl:function(a){return this.a.length},
k:function(a,b){return C.b.X(this.a,b)},
$ascw:function(){return[P.m]},
$asx:function(){return[P.m]},
$ask:function(){return[P.m]},
$asc:function(){return[P.m]}},
hG:{"^":"k;"},
ej:{"^":"b;a,b,c,0d,$ti",
gT:function(a){return this.d},
I:function(){var z,y,x,w
z=this.a
y=J.aH(z)
x=y.gl(z)
w=this.b
if(w==null?x!=null:w!==x)throw H.a(P.b4(z))
w=this.c
if(typeof x!=="number")return H.p(x)
if(w>=x){this.d=null
return!1}this.d=y.J(z,w);++this.c
return!0}},
il:{"^":"k;a,b,$ti",
ga0:function(a){return new H.im(J.by(this.a),this.b,this.$ti)},
gl:function(a){return J.au(this.a)},
J:function(a,b){return this.b.$1(J.cL(this.a,b))},
$ask:function(a,b){return[b]}},
im:{"^":"cX;0a,b,c,$ti",
I:function(){var z=this.b
if(z.I()){this.a=this.c.$1(z.gT(z))
return!0}this.a=null
return!1},
gT:function(a){return this.a},
$ascX:function(a,b){return[b]}},
kn:{"^":"k;a,b,$ti",
ga0:function(a){return new H.ko(J.by(this.a),this.b,this.$ti)}},
ko:{"^":"cX;a,b,$ti",
I:function(){var z,y
for(z=this.a,y=this.b;z.I();)if(y.$1(z.gT(z)))return!0
return!1},
gT:function(a){var z=this.a
return z.gT(z)}},
cl:{"^":"b;$ti"},
cw:{"^":"b;$ti",
m:function(a,b,c){H.D(b)
H.z(c,H.ay(this,"cw",0))
throw H.a(P.C("Cannot modify an unmodifiable list"))},
az:function(a,b,c,d){H.z(d,H.ay(this,"cw",0))
throw H.a(P.C("Cannot modify an unmodifiable list"))}},
jR:{"^":"cp+cw;"}}],["","",,H,{"^":"",
hv:function(){throw H.a(P.C("Cannot modify unmodifiable Map"))},
mD:function(a){return init.types[H.D(a)]},
fX:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.O(a).$isF},
l:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ab(a)
if(typeof z!=="string")throw H.a(H.ah(a))
return z},
bM:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
iR:function(a,b){var z,y,x,w,v,u
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.d(z,3)
y=H.M(z[3])
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return}if(b<2||b>36)throw H.a(P.a0(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.b.H(w,u)|32)>x)return}return parseInt(a,b)},
bd:function(a){var z,y,x,w,v,u,t,s,r
z=J.O(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.H||!!J.O(a).$isc8){v=C.v(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.H(w,0)===36)w=C.b.aB(w,1)
r=H.dC(H.bZ(H.b0(a)),0,null)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+r,init.mangledGlobalNames)},
iJ:function(){if(!!self.location)return self.location.href
return},
ev:function(a){var z,y,x,w,v
H.bZ(a)
z=J.au(a)
if(typeof z!=="number")return z.ek()
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
if(w<z)v=w
else v=z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
iS:function(a){var z,y,x,w
z=H.e([],[P.m])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.A)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.a(H.ah(w))
if(w<=65535)C.a.h(z,w)
else if(w<=1114111){C.a.h(z,55296+(C.d.aJ(w-65536,10)&1023))
C.a.h(z,56320+(w&1023))}else throw H.a(H.ah(w))}return H.ev(z)},
ew:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=a[y]
if(typeof x!=="number"||Math.floor(x)!==x)throw H.a(H.ah(x))
if(x<0)throw H.a(H.ah(x))
if(x>65535)return H.iS(a)}return H.ev(a)},
iT:function(a,b,c){var z,y,x,w
if(typeof c!=="number")return c.ek()
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
if(x<c)w=x
else w=c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
cs:function(a){var z
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.aJ(z,10))>>>0,56320|z&1023)}}throw H.a(P.a0(a,0,1114111,null,null))},
af:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
iQ:function(a){return a.b?H.af(a).getUTCFullYear()+0:H.af(a).getFullYear()+0},
iO:function(a){return a.b?H.af(a).getUTCMonth()+1:H.af(a).getMonth()+1},
iK:function(a){return a.b?H.af(a).getUTCDate()+0:H.af(a).getDate()+0},
iL:function(a){return a.b?H.af(a).getUTCHours()+0:H.af(a).getHours()+0},
iN:function(a){return a.b?H.af(a).getUTCMinutes()+0:H.af(a).getMinutes()+0},
iP:function(a){return a.b?H.af(a).getUTCSeconds()+0:H.af(a).getSeconds()+0},
iM:function(a){return a.b?H.af(a).getUTCMilliseconds()+0:H.af(a).getMilliseconds()+0},
p:function(a){throw H.a(H.ah(a))},
d:function(a,b){if(a==null)J.au(a)
throw H.a(H.aG(a,b))},
aG:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aI(!0,b,"index",null)
z=H.D(J.au(a))
if(!(b<0)){if(typeof z!=="number")return H.p(z)
y=b>=z}else y=!0
if(y)return P.S(b,a,"index",null,z)
return P.cu(b,"index",null)},
mx:function(a,b,c){if(a>c)return new P.ct(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.ct(a,c,!0,b,"end","Invalid value")
return new P.aI(!0,b,"end",null)},
ah:function(a){return new P.aI(!0,a,null,null)},
a:function(a){var z
if(a==null)a=new P.es()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.h5})
z.name=""}else z.toString=H.h5
return z},
h5:function(){return J.ab(this.dartException)},
t:function(a){throw H.a(a)},
A:function(a){throw H.a(P.b4(a))},
at:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.n6(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.aJ(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d_(H.l(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.er(H.l(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$eQ()
u=$.$get$eR()
t=$.$get$eS()
s=$.$get$eT()
r=$.$get$eX()
q=$.$get$eY()
p=$.$get$eV()
$.$get$eU()
o=$.$get$f_()
n=$.$get$eZ()
m=v.a8(y)
if(m!=null)return z.$1(H.d_(H.M(y),m))
else{m=u.a8(y)
if(m!=null){m.method="call"
return z.$1(H.d_(H.M(y),m))}else{m=t.a8(y)
if(m==null){m=s.a8(y)
if(m==null){m=r.a8(y)
if(m==null){m=q.a8(y)
if(m==null){m=p.a8(y)
if(m==null){m=s.a8(y)
if(m==null){m=o.a8(y)
if(m==null){m=n.a8(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.er(H.M(y),m))}}return z.$1(new H.jQ(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.eD()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aI(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.eD()
return a},
bw:function(a){var z
if(a==null)return new H.ft(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ft(a)},
mA:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
mK:function(a,b,c,d,e,f){H.f(a,"$iscV")
switch(H.D(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.a(P.v("Unsupported number of arguments for wrapped closure"))},
bu:function(a,b){var z
H.D(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.mK)
a.$identity=z
return z},
hr:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.O(d).$isc){z.$reflectionInfo=d
x=H.iY(z).r}else x=d
w=e?Object.create(new H.jl().constructor.prototype):Object.create(new H.cO(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function(){this.$initialize()}
else{u=$.aA
if(typeof u!=="number")return u.D()
$.aA=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.dW(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.mD,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.dP:H.cP
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.a("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.dW(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
ho:function(a,b,c,d){var z=H.cP
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dW:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hq(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ho(y,!w,z,b)
if(y===0){w=$.aA
if(typeof w!=="number")return w.D()
$.aA=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.bz
if(v==null){v=H.cg("self")
$.bz=v}return new Function(w+H.l(v)+";return "+u+"."+H.l(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aA
if(typeof w!=="number")return w.D()
$.aA=w+1
t+=w
w="return function("+t+"){return this."
v=$.bz
if(v==null){v=H.cg("self")
$.bz=v}return new Function(w+H.l(v)+"."+H.l(z)+"("+t+");}")()},
hp:function(a,b,c,d){var z,y
z=H.cP
y=H.dP
switch(b?-1:a){case 0:throw H.a(H.j7("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hq:function(a,b){var z,y,x,w,v,u,t,s
z=$.bz
if(z==null){z=H.cg("self")
$.bz=z}y=$.dO
if(y==null){y=H.cg("receiver")
$.dO=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hp(w,!u,x,b)
if(w===1){z="return function(){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+");"
y=$.aA
if(typeof y!=="number")return y.D()
$.aA=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+", "+s+");"
y=$.aA
if(typeof y!=="number")return y.D()
$.aA=y+1
return new Function(z+y+"}")()},
dw:function(a,b,c,d,e,f,g){var z,y
z=J.bE(H.bZ(b))
H.D(c)
y=!!J.O(d).$isc?J.bE(d):d
return H.hr(a,z,c,y,!!e,f,g)},
M:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.a(H.ax(a,"String"))},
my:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.a(H.ax(a,"double"))},
mW:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.a(H.ax(a,"num"))},
fP:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.a(H.ax(a,"bool"))},
D:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.a(H.ax(a,"int"))},
h1:function(a,b){throw H.a(H.ax(a,H.M(b).substring(3)))},
mY:function(a,b){var z=J.aH(b)
throw H.a(H.hn(a,z.v(b,3,z.gl(b))))},
f:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.O(a)[b])return a
H.h1(a,b)},
j:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.O(a)[b]
else z=!0
if(z)return a
H.mY(a,b)},
bZ:function(a){if(a==null)return a
if(!!J.O(a).$isc)return a
throw H.a(H.ax(a,"List"))},
fZ:function(a,b){if(a==null)return a
if(!!J.O(a).$isc)return a
if(J.O(a)[b])return a
H.h1(a,b)},
fT:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.D(z)]
else return a.$S()}return},
ca:function(a,b){var z,y
if(a==null)return!1
if(typeof a=="function")return!0
z=H.fT(J.O(a))
if(z==null)return!1
y=H.fW(z,null,b,null)
return y},
h:function(a,b){var z,y
if(a==null)return a
if($.ds)return a
$.ds=!0
try{if(H.ca(a,b))return a
z=H.cd(b)
y=H.ax(a,z)
throw H.a(y)}finally{$.ds=!1}},
dz:function(a,b){if(a!=null&&!H.dv(a,b))H.t(H.ax(a,H.cd(b)))
return a},
fK:function(a){var z
if(a instanceof H.n){z=H.fT(J.O(a))
if(z!=null)return H.cd(z)
return"Closure"}return H.bd(a)},
n4:function(a){throw H.a(new P.hy(H.M(a)))},
fU:function(a){return init.getIsolateTag(a)},
e:function(a,b){a.$ti=b
return a},
b0:function(a){if(a==null)return
return a.$ti},
p7:function(a,b,c){return H.bx(a["$as"+H.l(c)],H.b0(b))},
b_:function(a,b,c,d){var z
H.M(c)
H.D(d)
z=H.bx(a["$as"+H.l(c)],H.b0(b))
return z==null?null:z[d]},
ay:function(a,b,c){var z
H.M(b)
H.D(c)
z=H.bx(a["$as"+H.l(b)],H.b0(a))
return z==null?null:z[c]},
y:function(a,b){var z
H.D(b)
z=H.b0(a)
return z==null?null:z[b]},
cd:function(a){var z=H.b1(a,null)
return z},
b1:function(a,b){var z,y
H.w(b,"$isc",[P.i],"$asc")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dC(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(a===-2)return"dynamic"
if(typeof a==="number"){H.D(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.d(b,y)
return H.l(b[y])}if('func' in a)return H.mf(a,b)
if('futureOr' in a)return"FutureOr<"+H.b1("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
mf:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.i]
H.w(b,"$isc",z,"$asc")
if("bounds" in a){y=a.bounds
if(b==null){b=H.e([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.h(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.d(b,r)
t=C.b.D(t,b[r])
q=y[u]
if(q!=null&&q!==P.b)t+=" extends "+H.b1(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.b1(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.b1(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.b1(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.mz(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.M(z[l])
n=n+m+H.b1(i[h],b)+(" "+H.l(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
dC:function(a,b,c){var z,y,x,w,v,u
H.w(c,"$isc",[P.i],"$asc")
if(a==null)return""
z=new P.ao("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b1(u,c)}v="<"+z.i(0)+">"
return v},
bx:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bt:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.b0(a)
y=J.O(a)
if(y[b]==null)return!1
return H.fN(H.bx(y[d],z),null,c,null)},
w:function(a,b,c,d){var z,y
H.M(b)
H.bZ(c)
H.M(d)
if(a==null)return a
z=H.bt(a,b,c,d)
if(z)return a
z=b.substring(3)
y=H.dC(c,0,null)
throw H.a(H.ax(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(z+y,init.mangledGlobalNames)))},
fN:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.as(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.as(a[y],b,c[y],d))return!1
return!0},
p5:function(a,b,c){return a.apply(b,H.bx(J.O(b)["$as"+H.l(c)],H.b0(b)))},
fY:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="b"||a.builtin$cls==="G"||a===-1||a===-2||H.fY(z)}return!1},
dv:function(a,b){var z,y,x
if(a==null){z=b==null||b.builtin$cls==="b"||b.builtin$cls==="G"||b===-1||b===-2||H.fY(b)
return z}z=b==null||b===-1||b.builtin$cls==="b"||b===-2
if(z)return!0
if(typeof b=="object"){z='futureOr' in b
if(z)if(H.dv(a,"type" in b?b.type:null))return!0
if('func' in b)return H.ca(a,b)}y=J.O(a).constructor
x=H.b0(a)
if(x!=null){x=x.slice()
x.splice(0,0,y)
y=x}z=H.as(y,null,b,null)
return z},
z:function(a,b){if(a!=null&&!H.dv(a,b))throw H.a(H.ax(a,H.cd(b)))
return a},
as:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.as(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="G")return!0
if('func' in c)return H.fW(a,b,c,d)
if('func' in a)return c.builtin$cls==="cV"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.as("type" in a?a.type:null,b,x,d)
else if(H.as(a,b,x,d))return!0
else{if(!('$is'+"bC" in y.prototype))return!1
w=y.prototype["$as"+"bC"]
v=H.bx(w,z?a.slice(1):null)
return H.as(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=H.cd(t)
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.fN(H.bx(r,z),b,u,d)},
fW:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.as(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.as(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.as(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.as(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.mV(m,b,l,d)},
mV:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.as(c[w],d,a[w],b))return!1}return!0},
p6:function(a,b,c){Object.defineProperty(a,H.M(b),{value:c,enumerable:false,writable:true,configurable:true})},
mN:function(a){var z,y,x,w,v,u
z=H.M($.fV.$1(a))
y=$.cD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cG[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.M($.fM.$2(a,z))
if(z!=null){y=$.cD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cG[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cH(x)
$.cD[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cG[z]=x
return x}if(v==="-"){u=H.cH(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.h0(a,x)
if(v==="*")throw H.a(P.c7(z))
if(init.leafTags[z]===true){u=H.cH(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.h0(a,x)},
h0:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.dD(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cH:function(a){return J.dD(a,!1,null,!!a.$isF)},
mU:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.cH(z)
else return J.dD(z,c,null,null)},
mI:function(){if(!0===$.dB)return
$.dB=!0
H.mJ()},
mJ:function(){var z,y,x,w,v,u,t,s
$.cD=Object.create(null)
$.cG=Object.create(null)
H.mE()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.h2.$1(v)
if(u!=null){t=H.mU(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
mE:function(){var z,y,x,w,v,u,t
z=C.L()
z=H.bs(C.I,H.bs(C.N,H.bs(C.u,H.bs(C.u,H.bs(C.M,H.bs(C.J,H.bs(C.K(C.v),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.fV=new H.mF(v)
$.fM=new H.mG(u)
$.h2=new H.mH(t)},
bs:function(a,b){return a(b)||b},
h3:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
h4:function(a,b,c){var z,y,x
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
hu:{"^":"b;$ti",
i:function(a){return P.d1(this)},
m:function(a,b,c){H.z(b,H.y(this,0))
H.z(c,H.y(this,1))
return H.hv()},
$isJ:1},
hw:{"^":"hu;a,b,c,$ti",
gl:function(a){return this.a},
br:function(a,b){if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
k:function(a,b){if(!this.br(0,b))return
return this.d2(b)},
d2:function(a){return this.b[H.M(a)]},
L:function(a,b){var z,y,x,w,v
z=H.y(this,1)
H.h(b,{func:1,ret:-1,args:[H.y(this,0),z]})
y=this.c
for(x=y.length,w=0;w<x;++w){v=y[w]
b.$2(v,H.z(this.d2(v),z))}}},
iX:{"^":"b;a,b,c,d,e,f,r,0x",p:{
iY:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bE(z)
y=z[0]
x=z[1]
return new H.iX(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
jD:{"^":"b;a,b,c,d,e,f",
a8:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
p:{
aE:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.e([],[P.i])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jD(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cv:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eW:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
iE:{"^":"a6;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.l(this.a)
return"NullError: method not found: '"+z+"' on null"},
p:{
er:function(a,b){return new H.iE(a,b==null?null:b.method)}}},
i1:{"^":"a6;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.l(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.l(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.l(this.a)+")"},
p:{
d_:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.i1(a,y,z?null:b.receiver)}}},
jQ:{"^":"a6;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
n6:{"^":"n:16;a",
$1:function(a){if(!!J.O(a).$isa6)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ft:{"^":"b;a,0b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isaw:1},
n:{"^":"b;",
i:function(a){return"Closure '"+H.bd(this).trim()+"'"},
gei:function(){return this},
$iscV:1,
gei:function(){return this}},
eI:{"^":"n;"},
jl:{"^":"eI;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cO:{"^":"eI;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cO))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gU:function(a){var z,y
z=this.c
if(z==null)y=H.bM(this.a)
else y=typeof z!=="object"?J.b2(z):H.bM(z)
return(y^H.bM(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.l(this.d)+"' of "+("Instance of '"+H.bd(z)+"'")},
p:{
cP:function(a){return a.a},
dP:function(a){return a.c},
cg:function(a){var z,y,x,w,v
z=new H.cO("self","target","receiver","name")
y=J.bE(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
jE:{"^":"a6;a",
i:function(a){return this.a},
p:{
ax:function(a,b){return new H.jE("TypeError: "+H.l(P.ck(a))+": type '"+H.fK(a)+"' is not a subtype of type '"+b+"'")}}},
hm:{"^":"a6;a",
i:function(a){return this.a},
p:{
hn:function(a,b){return new H.hm("CastError: "+H.l(P.ck(a))+": type '"+H.fK(a)+"' is not a subtype of type '"+b+"'")}}},
j6:{"^":"a6;a",
i:function(a){return"RuntimeError: "+H.l(this.a)},
p:{
j7:function(a){return new H.j6(a)}}},
aY:{"^":"ii;a,0b,0c,0d,0e,0f,r,$ti",
gl:function(a){return this.a},
gao:function(a){return new H.i6(this,[H.y(this,0)])},
br:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.d_(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.d_(y,b)}else return this.hD(b)},
hD:function(a){var z=this.d
if(z==null)return!1
return this.cs(this.bT(z,this.cr(a)),a)>=0},
k:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bi(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.bi(w,b)
x=y==null?null:y.b
return x}else return this.hE(b)},
hE:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bT(z,this.cr(a))
x=this.cs(y,a)
if(x<0)return
return y[x].b},
m:function(a,b,c){var z,y
H.z(b,H.y(this,0))
H.z(c,H.y(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.bX()
this.b=z}this.cT(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bX()
this.c=y}this.cT(y,b,c)}else this.hF(b,c)},
hF:function(a,b){var z,y,x,w
H.z(a,H.y(this,0))
H.z(b,H.y(this,1))
z=this.d
if(z==null){z=this.bX()
this.d=z}y=this.cr(a)
x=this.bT(z,y)
if(x==null)this.c3(z,y,[this.bY(a,b)])
else{w=this.cs(x,a)
if(w>=0)x[w].b=b
else x.push(this.bY(a,b))}},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[H.y(this,0),H.y(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.a(P.b4(this))
z=z.c}},
cT:function(a,b,c){var z
H.z(b,H.y(this,0))
H.z(c,H.y(this,1))
z=this.bi(a,b)
if(z==null)this.c3(a,b,this.bY(b,c))
else z.b=c},
eX:function(){this.r=this.r+1&67108863},
bY:function(a,b){var z,y
z=new H.i5(H.z(a,H.y(this,0)),H.z(b,H.y(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.eX()
return z},
cr:function(a){return J.b2(a)&0x3ffffff},
cs:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.P(a[y].a,b))return y
return-1},
i:function(a){return P.d1(this)},
bi:function(a,b){return a[b]},
bT:function(a,b){return a[b]},
c3:function(a,b,c){a[b]=c},
eQ:function(a,b){delete a[b]},
d_:function(a,b){return this.bi(a,b)!=null},
bX:function(){var z=Object.create(null)
this.c3(z,"<non-identifier-key>",z)
this.eQ(z,"<non-identifier-key>")
return z},
$iseh:1},
i5:{"^":"b;a,b,0c,0d"},
i6:{"^":"hG;a,$ti",
gl:function(a){return this.a.a},
ga0:function(a){var z,y
z=this.a
y=new H.i7(z,z.r,this.$ti)
y.c=z.e
return y}},
i7:{"^":"b;a,b,0c,0d,$ti",
gT:function(a){return this.d},
I:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.b4(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
mF:{"^":"n:16;a",
$1:function(a){return this.a(a)}},
mG:{"^":"n:39;a",
$2:function(a,b){return this.a(a,b)}},
mH:{"^":"n:28;a",
$1:function(a){return this.a(H.M(a))}},
i_:{"^":"b;a,b,0c,0d",
i:function(a){return"RegExp/"+this.a+"/"},
$iset:1,
$isiZ:1,
p:{
i0:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.a(P.Y("Illegal RegExp pattern ("+String(w)+")",a,null))}}}}],["","",,H,{"^":"",
mz:function(a){return J.ec(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
mX:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
bq:function(a){return a},
iA:function(a){return new Int8Array(a)},
aF:function(a,b,c){if(a>>>0!==a||a>=c)throw H.a(H.aG(b,a))},
m9:function(a,b,c){var z
if(!(a>>>0!==a))z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.a(H.mx(a,b,c))
return b},
eq:{"^":"r;",$iseq:1,"%":"ArrayBuffer"},
d6:{"^":"r;",$isd6:1,"%":"DataView;ArrayBufferView;d5|fn|fo|iB|fp|fq|aZ"},
d5:{"^":"d6;",
gl:function(a){return a.length},
$isF:1,
$asF:I.dy},
iB:{"^":"fo;",
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
m:function(a,b,c){H.D(b)
H.my(c)
H.aF(b,a,a.length)
a[b]=c},
$ascl:function(){return[P.q]},
$asx:function(){return[P.q]},
$isk:1,
$ask:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
"%":"Float32Array|Float64Array"},
aZ:{"^":"fq;",
m:function(a,b,c){H.D(b)
H.D(c)
H.aF(b,a,a.length)
a[b]=c},
$ascl:function(){return[P.m]},
$asx:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]}},
ob:{"^":"aZ;",
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
"%":"Int16Array"},
oc:{"^":"aZ;",
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
"%":"Int32Array"},
od:{"^":"aZ;",
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
"%":"Int8Array"},
oe:{"^":"aZ;",
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
of:{"^":"aZ;",
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
og:{"^":"aZ;",
gl:function(a){return a.length},
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
d7:{"^":"aZ;",
gl:function(a){return a.length},
k:function(a,b){H.aF(b,a,a.length)
return a[b]},
bK:function(a,b,c){return new Uint8Array(a.subarray(b,H.m9(b,c,a.length)))},
$isd7:1,
$isR:1,
"%":";Uint8Array"},
fn:{"^":"d5+x;"},
fo:{"^":"fn+cl;"},
fp:{"^":"d5+x;"},
fq:{"^":"fp+cl;"}}],["","",,P,{"^":"",
kq:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.mm()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.bu(new P.ks(z),1)).observe(y,{childList:true})
return new P.kr(z,y,x)}else if(self.setImmediate!=null)return P.mn()
return P.mo()},
oV:[function(a){self.scheduleImmediate(H.bu(new P.kt(H.h(a,{func:1,ret:-1})),0))},"$1","mm",4,0,11],
oW:[function(a){self.setImmediate(H.bu(new P.ku(H.h(a,{func:1,ret:-1})),0))},"$1","mn",4,0,11],
oX:[function(a){P.df(C.r,H.h(a,{func:1,ret:-1}))},"$1","mo",4,0,11],
df:function(a,b){var z
H.h(b,{func:1,ret:-1})
z=C.d.a3(a.a,1000)
return P.lt(z<0?0:z,b)},
eL:function(a,b){var z
H.h(b,{func:1,ret:-1,args:[P.bk]})
z=C.d.a3(a.a,1000)
return P.lu(z<0?0:z,b)},
mi:function(a,b){if(H.ca(a,{func:1,args:[P.b,P.aw]}))return b.i2(a,null,P.b,P.aw)
if(H.ca(a,{func:1,args:[P.b]}))return H.h(a,{func:1,ret:null,args:[P.b]})
throw H.a(P.cf(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
mh:function(){var z,y
for(;z=$.br,z!=null;){$.bX=null
y=z.b
$.br=y
if(y==null)$.bW=null
z.a.$0()}},
p4:[function(){$.dt=!0
try{P.mh()}finally{$.bX=null
$.dt=!1
if($.br!=null)$.$get$dm().$1(P.fO())}},"$0","fO",0,0,3],
fJ:function(a){var z=new P.fg(H.h(a,{func:1,ret:-1}))
if($.br==null){$.bW=z
$.br=z
if(!$.dt)$.$get$dm().$1(P.fO())}else{$.bW.b=z
$.bW=z}},
ml:function(a){var z,y,x
H.h(a,{func:1,ret:-1})
z=$.br
if(z==null){P.fJ(a)
$.bX=$.bW
return}y=new P.fg(a)
x=$.bX
if(x==null){y.b=z
$.bX=y
$.br=y}else{y.b=x.b
x.b=y
$.bX=y
if(y.b==null)$.bW=y}},
mZ:function(a){var z,y
z={func:1,ret:-1}
H.h(a,z)
y=$.T
if(C.j===y){P.cC(null,null,C.j,a)
return}y.toString
P.cC(null,null,y,H.h(y.c9(a),z))},
jz:function(a,b){var z,y
z={func:1,ret:-1}
H.h(b,z)
y=$.T
if(y===C.j){y.toString
return P.df(a,b)}return P.df(a,H.h(y.c9(b),z))},
jA:function(a,b){var z,y,x
z={func:1,ret:-1,args:[P.bk]}
H.h(b,z)
y=$.T
if(y===C.j){y.toString
return P.eL(a,b)}x=y.dl(b,P.bk)
$.T.toString
return P.eL(a,H.h(x,z))},
cB:function(a,b,c,d,e){var z={}
z.a=d
P.ml(new P.mj(z,e))},
fF:function(a,b,c,d,e){var z,y
H.h(d,{func:1,ret:e})
y=$.T
if(y===c)return d.$0()
$.T=c
z=y
try{y=d.$0()
return y}finally{$.T=z}},
fG:function(a,b,c,d,e,f,g){var z,y
H.h(d,{func:1,ret:f,args:[g]})
H.z(e,g)
y=$.T
if(y===c)return d.$1(e)
$.T=c
z=y
try{y=d.$1(e)
return y}finally{$.T=z}},
mk:function(a,b,c,d,e,f,g,h,i){var z,y
H.h(d,{func:1,ret:g,args:[h,i]})
H.z(e,h)
H.z(f,i)
y=$.T
if(y===c)return d.$2(e,f)
$.T=c
z=y
try{y=d.$2(e,f)
return y}finally{$.T=z}},
cC:function(a,b,c,d){var z
H.h(d,{func:1,ret:-1})
z=C.j!==c
if(z)d=!(!z||!1)?c.c9(d):c.hk(d,-1)
P.fJ(d)},
ks:{"^":"n:26;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
kr:{"^":"n:36;a,b,c",
$1:function(a){var z,y
this.a.a=H.h(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
kt:{"^":"n:0;a",
$0:function(){this.a.$0()}},
ku:{"^":"n:0;a",
$0:function(){this.a.$0()}},
fw:{"^":"b;a,0b,c",
eD:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.bu(new P.lw(this,b),0),a)
else throw H.a(P.C("`setTimeout()` not found."))},
eE:function(a,b){if(self.setTimeout!=null)this.b=self.setInterval(H.bu(new P.lv(this,a,Date.now(),b),0),a)
else throw H.a(P.C("Periodic timer."))},
$isbk:1,
p:{
lt:function(a,b){var z=new P.fw(!0,0)
z.eD(a,b)
return z},
lu:function(a,b){var z=new P.fw(!1,0)
z.eE(a,b)
return z}}},
lw:{"^":"n:3;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
lv:{"^":"n:0;a,b,c,d",
$0:function(){var z,y,x,w
z=this.a
y=z.c+1
x=this.b
if(x>0){w=Date.now()-this.c
if(w>(y+1)*x)y=C.d.er(w,x)}z.c=y
this.d.$1(z)}},
bp:{"^":"b;0a,b,c,d,e,$ti",
hL:function(a){if(this.c!==6)return!0
return this.b.b.cG(H.h(this.d,{func:1,ret:P.ai,args:[P.b]}),a.a,P.ai,P.b)},
hC:function(a){var z,y,x,w
z=this.e
y=P.b
x={futureOr:1,type:H.y(this,1)}
w=this.b.b
if(H.ca(z,{func:1,args:[P.b,P.aw]}))return H.dz(w.i9(z,a.a,a.b,null,y,P.aw),x)
else return H.dz(w.cG(H.h(z,{func:1,args:[P.b]}),a.a,null,y),x)}},
aU:{"^":"b;dd:a<,b,0fD:c<,$ti",
ec:function(a,b,c){var z,y,x,w
z=H.y(this,0)
H.h(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.T
if(y!==C.j){y.toString
H.h(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.mi(b,y)}H.h(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.aU(0,$.T,[c])
w=b==null?1:3
this.cU(new P.bp(x,w,a,b,[z,c]))
return x},
ic:function(a,b){return this.ec(a,null,b)},
cU:function(a){var z,y
z=this.a
if(z<=1){a.a=H.f(this.c,"$isbp")
this.c=a}else{if(z===2){y=H.f(this.c,"$isaU")
z=y.a
if(z<4){y.cU(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.cC(null,null,z,H.h(new P.kJ(this,a),{func:1,ret:-1}))}},
d7:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.f(this.c,"$isbp")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.f(this.c,"$isaU")
y=u.a
if(y<4){u.d7(a)
return}this.a=y
this.c=u.c}z.a=this.bl(a)
y=this.b
y.toString
P.cC(null,null,y,H.h(new P.kO(z,this),{func:1,ret:-1}))}},
c_:function(){var z=H.f(this.c,"$isbp")
this.c=null
return this.bl(z)},
bl:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
cX:function(a){var z,y,x,w
z=H.y(this,0)
H.dz(a,{futureOr:1,type:z})
y=this.$ti
x=H.bt(a,"$isbC",y,"$asbC")
if(x){z=H.bt(a,"$isaU",y,null)
if(z)P.fj(a,this)
else P.kK(a,this)}else{w=this.c_()
H.z(a,z)
this.a=4
this.c=a
P.bR(this,w)}},
bP:[function(a,b){var z
H.f(b,"$isaw")
z=this.c_()
this.a=8
this.c=new P.al(a,b)
P.bR(this,z)},function(a){return this.bP(a,null)},"il","$2","$1","geM",4,2,29],
$isbC:1,
p:{
kK:function(a,b){var z,y,x
b.a=1
try{a.ec(new P.kL(b),new P.kM(b),null)}catch(x){z=H.at(x)
y=H.bw(x)
P.mZ(new P.kN(b,z,y))}},
fj:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.f(a.c,"$isaU")
if(z>=4){y=b.c_()
b.a=a.a
b.c=a.c
P.bR(b,y)}else{y=H.f(b.c,"$isbp")
b.a=2
b.c=a
a.d7(y)}},
bR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.f(y.c,"$isal")
y=y.b
u=v.a
t=v.b
y.toString
P.cB(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.bR(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.f(r,"$isal")
y=y.b
u=r.a
t=r.b
y.toString
P.cB(null,null,y,u,t)
return}o=$.T
if(o==null?q!=null:o!==q)$.T=q
else o=null
y=b.c
if(y===8)new P.kR(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.kQ(x,b,r).$0()}else if((y&2)!==0)new P.kP(z,x,b).$0()
if(o!=null)$.T=o
y=x.b
if(!!J.O(y).$isbC){if(y.a>=4){n=H.f(t.c,"$isbp")
t.c=null
b=t.bl(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.fj(y,t)
return}}m=b.b
n=H.f(m.c,"$isbp")
m.c=null
b=m.bl(n)
y=x.a
u=x.b
if(!y){H.z(u,H.y(m,0))
m.a=4
m.c=u}else{H.f(u,"$isal")
m.a=8
m.c=u}z.a=m
y=m}}}},
kJ:{"^":"n:0;a,b",
$0:function(){P.bR(this.a,this.b)}},
kO:{"^":"n:0;a,b",
$0:function(){P.bR(this.b,this.a.a)}},
kL:{"^":"n:26;a",
$1:function(a){var z=this.a
z.a=0
z.cX(a)}},
kM:{"^":"n:51;a",
$2:function(a,b){this.a.bP(a,H.f(b,"$isaw"))},
$1:function(a){return this.$2(a,null)}},
kN:{"^":"n:0;a,b,c",
$0:function(){this.a.bP(this.b,this.c)}},
kR:{"^":"n:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.e9(H.h(w.d,{func:1}),null)}catch(v){y=H.at(v)
x=H.bw(v)
if(this.d){w=H.f(this.a.a.c,"$isal").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.f(this.a.a.c,"$isal")
else u.b=new P.al(y,x)
u.a=!0
return}if(!!J.O(z).$isbC){if(z instanceof P.aU&&z.gdd()>=4){if(z.gdd()===8){w=this.b
w.b=H.f(z.gfD(),"$isal")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.ic(new P.kS(t),null)
w.a=!1}}},
kS:{"^":"n:34;a",
$1:function(a){return this.a}},
kQ:{"^":"n:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.y(x,0)
v=H.z(this.c,w)
u=H.y(x,1)
this.a.b=x.b.b.cG(H.h(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.at(t)
y=H.bw(t)
x=this.a
x.b=new P.al(z,y)
x.a=!0}}},
kP:{"^":"n:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.f(this.a.a.c,"$isal")
w=this.c
if(w.hL(z)&&w.e!=null){v=this.b
v.b=w.hC(z)
v.a=!1}}catch(u){y=H.at(u)
x=H.bw(u)
w=H.f(this.a.a.c,"$isal")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.al(y,x)
s.a=!0}}},
fg:{"^":"b;a,0b"},
dc:{"^":"b;$ti",
gl:function(a){var z,y
z={}
y=new P.aU(0,$.T,[P.m])
z.a=0
this.hK(new P.jo(z,this),!0,new P.jp(z,y),y.geM())
return y}},
jo:{"^":"n;a,b",
$1:function(a){H.z(a,H.ay(this.b,"dc",0));++this.a.a},
$S:function(){return{func:1,ret:P.G,args:[H.ay(this.b,"dc",0)]}}},
jp:{"^":"n:0;a,b",
$0:function(){this.b.cX(this.a.a)}},
eF:{"^":"b;$ti"},
jn:{"^":"b;"},
bk:{"^":"b;"},
al:{"^":"b;a,b",
i:function(a){return H.l(this.a)},
$isa6:1},
lY:{"^":"b;",$isoU:1},
mj:{"^":"n:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.es()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.a(z)
x=H.a(z)
x.stack=y.i(0)
throw x}},
lb:{"^":"lY;",
ia:function(a){var z,y,x
H.h(a,{func:1,ret:-1})
try{if(C.j===$.T){a.$0()
return}P.fF(null,null,this,a,-1)}catch(x){z=H.at(x)
y=H.bw(x)
P.cB(null,null,this,z,H.f(y,"$isaw"))}},
ib:function(a,b,c){var z,y,x
H.h(a,{func:1,ret:-1,args:[c]})
H.z(b,c)
try{if(C.j===$.T){a.$1(b)
return}P.fG(null,null,this,a,b,-1,c)}catch(x){z=H.at(x)
y=H.bw(x)
P.cB(null,null,this,z,H.f(y,"$isaw"))}},
hk:function(a,b){return new P.ld(this,H.h(a,{func:1,ret:b}),b)},
c9:function(a){return new P.lc(this,H.h(a,{func:1,ret:-1}))},
dl:function(a,b){return new P.le(this,H.h(a,{func:1,ret:-1,args:[b]}),b)},
e9:function(a,b){H.h(a,{func:1,ret:b})
if($.T===C.j)return a.$0()
return P.fF(null,null,this,a,b)},
cG:function(a,b,c,d){H.h(a,{func:1,ret:c,args:[d]})
H.z(b,d)
if($.T===C.j)return a.$1(b)
return P.fG(null,null,this,a,b,c,d)},
i9:function(a,b,c,d,e,f){H.h(a,{func:1,ret:d,args:[e,f]})
H.z(b,e)
H.z(c,f)
if($.T===C.j)return a.$2(b,c)
return P.mk(null,null,this,a,b,c,d,e,f)},
i2:function(a,b,c,d){return H.h(a,{func:1,ret:b,args:[c,d]})}},
ld:{"^":"n;a,b,c",
$0:function(){return this.a.e9(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
lc:{"^":"n:3;a,b",
$0:function(){return this.a.ia(this.b)}},
le:{"^":"n;a,b,c",
$1:function(a){var z=this.c
return this.a.ib(this.b,H.z(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
i8:function(a,b,c,d,e){return new H.aY(0,0,[d,e])},
i9:function(a,b,c){H.bZ(a)
return H.w(H.mA(a,new H.aY(0,0,[b,c])),"$iseh",[b,c],"$aseh")},
ei:function(a,b){return new H.aY(0,0,[a,b])},
ic:function(a,b,c,d){return new P.kY(0,0,[d])},
hV:function(a,b,c){var z,y
if(P.du(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bY()
C.a.h(y,a)
try{P.mg(a,z)}finally{if(0>=y.length)return H.d(y,-1)
y.pop()}y=P.eG(b,H.fZ(z,"$isk"),", ")+c
return y.charCodeAt(0)==0?y:y},
cW:function(a,b,c){var z,y,x
if(P.du(a))return b+"..."+c
z=new P.ao(b)
y=$.$get$bY()
C.a.h(y,a)
try{x=z
x.a=P.eG(x.gaG(),a,", ")}finally{if(0>=y.length)return H.d(y,-1)
y.pop()}y=z
y.a=y.gaG()+c
y=z.gaG()
return y.charCodeAt(0)==0?y:y},
du:function(a){var z,y
for(z=0;y=$.$get$bY(),z<y.length;++z)if(a===y[z])return!0
return!1},
mg:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga0(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.I())return
w=H.l(z.gT(z))
C.a.h(b,w)
y+=w.length+2;++x}if(!z.I()){if(x<=5)return
if(0>=b.length)return H.d(b,-1)
v=b.pop()
if(0>=b.length)return H.d(b,-1)
u=b.pop()}else{t=z.gT(z);++x
if(!z.I()){if(x<=4){C.a.h(b,H.l(t))
return}v=H.l(t)
if(0>=b.length)return H.d(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gT(z);++x
for(;z.I();t=s,s=r){r=z.gT(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.d(b,-1)
y-=b.pop().length+2;--x}C.a.h(b,"...")
return}}u=H.l(t)
v=H.l(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.d(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.h(b,q)
C.a.h(b,u)
C.a.h(b,v)},
ia:function(a,b,c){var z=P.i8(null,null,null,b,c)
a.L(0,new P.ib(z,b,c))
return z},
d1:function(a){var z,y,x
z={}
if(P.du(a))return"{...}"
y=new P.ao("")
try{C.a.h($.$get$bY(),a)
x=y
x.a=x.gaG()+"{"
z.a=!0
J.dI(a,new P.ij(z,y))
z=y
z.a=z.gaG()+"}"}finally{z=$.$get$bY()
if(0>=z.length)return H.d(z,-1)
z.pop()}z=y.gaG()
return z.charCodeAt(0)==0?z:z},
kY:{"^":"kT;a,0b,0c,0d,0e,0f,r,$ti",
ga0:function(a){return P.fm(this,this.r,H.y(this,0))},
gl:function(a){return this.a},
h:function(a,b){var z,y
H.z(b,H.y(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.dp()
this.b=z}return this.cV(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.dp()
this.c=y}return this.cV(y,b)}else return this.eF(0,b)},
eF:function(a,b){var z,y,x
H.z(b,H.y(this,0))
z=this.d
if(z==null){z=P.dp()
this.d=z}y=this.cY(b)
x=z[y]
if(x==null)z[y]=[this.bO(b)]
else{if(this.d3(x,b)>=0)return!1
x.push(this.bO(b))}return!0},
S:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.d8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d8(this.c,b)
else return this.fu(0,b)},
fu:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.eU(z,b)
x=this.d3(y,b)
if(x<0)return!1
this.df(y.splice(x,1)[0])
return!0},
cV:function(a,b){H.z(b,H.y(this,0))
if(H.f(a[b],"$isdn")!=null)return!1
a[b]=this.bO(b)
return!0},
d8:function(a,b){var z
if(a==null)return!1
z=H.f(a[b],"$isdn")
if(z==null)return!1
this.df(z)
delete a[b]
return!0},
cW:function(){this.r=this.r+1&67108863},
bO:function(a){var z,y
z=new P.dn(H.z(a,H.y(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.cW()
return z},
df:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.cW()},
cY:function(a){return J.b2(a)&0x3ffffff},
eU:function(a,b){return a[this.cY(b)]},
d3:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.P(a[y].a,b))return y
return-1},
p:{
dp:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
dn:{"^":"b;a,0b,0c"},
kZ:{"^":"b;a,b,0c,0d,$ti",
gT:function(a){return this.d},
I:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.b4(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=H.z(z.a,H.y(this,0))
this.c=z.b
return!0}}},
p:{
fm:function(a,b,c){var z=new P.kZ(a,b,[c])
z.c=a.e
return z}}},
kT:{"^":"j8;"},
ib:{"^":"n:6;a,b,c",
$2:function(a,b){this.a.m(0,H.z(a,this.b),H.z(b,this.c))}},
cp:{"^":"l_;",$isk:1,$isc:1},
x:{"^":"b;$ti",
ga0:function(a){return new H.ej(a,this.gl(a),0,[H.b_(this,a,"x",0)])},
J:function(a,b){return this.k(a,b)},
ig:function(a,b){var z,y,x
z=H.e([],[H.b_(this,a,"x",0)])
C.a.sl(z,this.gl(a))
y=0
while(!0){x=this.gl(a)
if(typeof x!=="number")return H.p(x)
if(!(y<x))break
C.a.m(z,y,this.k(a,y));++y}return z},
ie:function(a){return this.ig(a,!0)},
az:function(a,b,c,d){var z
H.z(d,H.b_(this,a,"x",0))
P.aM(b,c,this.gl(a),null,null,null)
for(z=b;z<c;++z)this.m(a,z,d)},
i:function(a){return P.cW(a,"[","]")}},
ii:{"^":"aj;"},
ij:{"^":"n:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.l(a)
z.a=y+": "
z.a+=H.l(b)}},
aj:{"^":"b;$ti",
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[H.b_(this,a,"aj",0),H.b_(this,a,"aj",1)]})
for(z=J.by(this.gao(a));z.I();){y=z.gT(z)
b.$2(y,this.k(a,y))}},
gl:function(a){return J.au(this.gao(a))},
i:function(a){return P.d1(a)},
$isJ:1},
lB:{"^":"b;$ti",
m:function(a,b,c){H.z(b,H.y(this,0))
H.z(c,H.y(this,1))
throw H.a(P.C("Cannot modify unmodifiable map"))}},
ik:{"^":"b;$ti",
k:function(a,b){return J.dH(this.a,b)},
m:function(a,b,c){J.cJ(this.a,H.z(b,H.y(this,0)),H.z(c,H.y(this,1)))},
L:function(a,b){J.dI(this.a,H.h(b,{func:1,ret:-1,args:[H.y(this,0),H.y(this,1)]}))},
gl:function(a){return J.au(this.a)},
i:function(a){return J.ab(this.a)},
$isJ:1},
f6:{"^":"lC;a,$ti"},
ja:{"^":"b;$ti",
i:function(a){return P.cW(this,"{","}")},
J:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(P.dK("index"))
if(b<0)H.t(P.a0(b,0,null,"index",null))
for(z=P.fm(this,this.r,H.y(this,0)),y=0;z.I();){x=z.d
if(b===y)return x;++y}throw H.a(P.S(b,this,"index",null,y))},
$isk:1},
j8:{"^":"ja;"},
l_:{"^":"b+x;"},
lC:{"^":"ik+lB;$ti"}}],["","",,P,{"^":"",hj:{"^":"c_;a",
hO:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
d=P.aM(c,d,b.length,null,null,null)
z=$.$get$fh()
if(typeof d!=="number")return H.p(d)
y=c
x=y
w=null
v=-1
u=-1
t=0
for(;y<d;y=s){s=y+1
r=C.b.H(b,y)
if(r===37){q=s+2
if(q<=d){p=H.cF(C.b.H(b,s))
o=H.cF(C.b.H(b,s+1))
n=p*16+o-(o&256)
if(n===37)n=-1
s=q}else n=-1}else n=r
if(0<=n&&n<=127){if(n<0||n>=z.length)return H.d(z,n)
m=z[n]
if(m>=0){n=C.b.X("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",m)
if(n===r)continue
r=n}else{if(m===-1){if(v<0){l=w==null?null:w.a.length
if(l==null)l=0
v=l+(y-x)
u=y}++t
if(r===61)continue}r=n}if(m!==-2){if(w==null)w=new P.ao("")
w.a+=C.b.v(b,x,y)
w.a+=H.cs(r)
x=s
continue}}throw H.a(P.Y("Invalid base64 data",b,y))}if(w!=null){l=w.a+=C.b.v(b,x,d)
k=l.length
if(v>=0)P.dN(b,u,d,v,t,k)
else{j=C.d.bg(k-1,4)+1
if(j===1)throw H.a(P.Y("Invalid base64 encoding length ",b,d))
for(;j<4;){l+="="
w.a=l;++j}}l=w.a
return C.b.aT(b,c,d,l.charCodeAt(0)==0?l:l)}i=d-c
if(v>=0)P.dN(b,u,d,v,t,i)
else{j=C.d.bg(i,4)
if(j===1)throw H.a(P.Y("Invalid base64 encoding length ",b,d))
if(j>1)b=C.b.aT(b,d,d,j===2?"==":"=")}return b},
$asc_:function(){return[[P.c,P.m],P.i]},
p:{
dN:function(a,b,c,d,e,f){if(C.d.bg(f,4)!==0)throw H.a(P.Y("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw H.a(P.Y("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw H.a(P.Y("Invalid base64 padding, more than two '=' characters",a,b))}}},hk:{"^":"bA;a",
$asbA:function(){return[[P.c,P.m],P.i]}},c_:{"^":"b;$ti"},bA:{"^":"jn;$ti"},hI:{"^":"c_;",
$asc_:function(){return[P.i,[P.c,P.m]]}},k3:{"^":"hI;a",
ghw:function(){return C.F}},ka:{"^":"bA;",
aY:function(a,b,c){var z,y,x,w
z=a.length
P.aM(b,c,z,null,null,null)
y=z-b
if(y===0)return new Uint8Array(0)
x=new Uint8Array(y*3)
w=new P.lX(0,0,x)
if(w.eS(a,b,z)!==z)w.dh(J.hb(a,z-1),0)
return C.U.bK(x,0,w.b)},
cf:function(a){return this.aY(a,0,null)},
$asbA:function(){return[P.i,[P.c,P.m]]}},lX:{"^":"b;a,b,c",
dh:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
x=y+1
w=z.length
if((b&64512)===56320){v=65536+((a&1023)<<10)|b&1023
this.b=x
if(y>=w)return H.d(z,y)
z[y]=240|v>>>18
y=x+1
this.b=y
if(x>=w)return H.d(z,x)
z[x]=128|v>>>12&63
x=y+1
this.b=x
if(y>=w)return H.d(z,y)
z[y]=128|v>>>6&63
this.b=x+1
if(x>=w)return H.d(z,x)
z[x]=128|v&63
return!0}else{this.b=x
if(y>=w)return H.d(z,y)
z[y]=224|a>>>12
y=x+1
this.b=y
if(x>=w)return H.d(z,x)
z[x]=128|a>>>6&63
this.b=y+1
if(y>=w)return H.d(z,y)
z[y]=128|a&63
return!1}},
eS:function(a,b,c){var z,y,x,w,v,u,t
if(b!==c&&(C.b.X(a,c-1)&64512)===55296)--c
for(z=this.c,y=z.length,x=b;x<c;++x){w=C.b.H(a,x)
if(w<=127){v=this.b
if(v>=y)break
this.b=v+1
z[v]=w}else if((w&64512)===55296){if(this.b+3>=y)break
u=x+1
if(this.dh(w,C.b.H(a,u)))x=u}else if(w<=2047){v=this.b
t=v+1
if(t>=y)break
this.b=t
if(v>=y)return H.d(z,v)
z[v]=192|w>>>6
this.b=t+1
z[t]=128|w&63}else{v=this.b
if(v+2>=y)break
t=v+1
this.b=t
if(v>=y)return H.d(z,v)
z[v]=224|w>>>12
v=t+1
this.b=v
if(t>=y)return H.d(z,t)
z[t]=128|w>>>6&63
this.b=v+1
if(v>=y)return H.d(z,v)
z[v]=128|w&63}}return x}},k4:{"^":"bA;a",
aY:function(a,b,c){var z,y,x,w,v
H.w(a,"$isc",[P.m],"$asc")
z=P.k5(!1,a,b,c)
if(z!=null)return z
y=J.au(a)
P.aM(b,c,y,null,null,null)
x=new P.ao("")
w=new P.lU(!1,x,!0,0,0,0)
w.aY(a,b,y)
w.hy(0,a,y)
v=x.a
return v.charCodeAt(0)==0?v:v},
cf:function(a){return this.aY(a,0,null)},
$asbA:function(){return[[P.c,P.m],P.i]},
p:{
k5:function(a,b,c,d){H.w(b,"$isc",[P.m],"$asc")
if(b instanceof Uint8Array)return P.k6(!1,b,c,d)
return},
k6:function(a,b,c,d){var z,y,x
z=$.$get$fb()
if(z==null)return
y=0===c
if(y&&!0)return P.dk(z,b)
x=b.length
d=P.aM(c,d,x,null,null,null)
if(y&&d===x)return P.dk(z,b)
return P.dk(z,b.subarray(c,d))},
dk:function(a,b){if(P.k8(b))return
return P.k9(a,b)},
k9:function(a,b){var z,y
try{z=a.decode(b)
return z}catch(y){H.at(y)}return},
k8:function(a){var z,y
z=a.length-2
for(y=0;y<z;++y)if(a[y]===237)if((a[y+1]&224)===160)return!0
return!1},
k7:function(){var z,y
try{z=new TextDecoder("utf-8",{fatal:true})
return z}catch(y){H.at(y)}return}}},lU:{"^":"b;a,b,c,d,e,f",
hy:function(a,b,c){var z
H.w(b,"$isc",[P.m],"$asc")
if(this.e>0){z=P.Y("Unfinished UTF-8 octet sequence",b,c)
throw H.a(z)}},
aY:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
H.w(a,"$isc",[P.m],"$asc")
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.lW(c)
v=new P.lV(this,b,c,a)
$label0$0:for(u=J.aH(a),t=this.b,s=b;!0;s=n){$label1$1:if(y>0){do{if(s===c)break $label0$0
r=u.k(a,s)
if(typeof r!=="number")return r.bI()
if((r&192)!==128){q=P.Y("Bad UTF-8 encoding 0x"+C.d.bb(r,16),a,s)
throw H.a(q)}else{z=(z<<6|r&63)>>>0;--y;++s}}while(y>0)
q=x-1
if(q<0||q>=4)return H.d(C.w,q)
if(z<=C.w[q]){q=P.Y("Overlong encoding of 0x"+C.d.bb(z,16),a,s-x-1)
throw H.a(q)}if(z>1114111){q=P.Y("Character outside valid Unicode range: 0x"+C.d.bb(z,16),a,s-x-1)
throw H.a(q)}if(!this.c||z!==65279)t.a+=H.cs(z)
this.c=!1}for(q=s<c;q;){p=w.$2(a,s)
if(typeof p!=="number")return p.cN()
if(p>0){this.c=!1
o=s+p
v.$2(s,o)
if(o===c)break}else o=s
n=o+1
r=u.k(a,o)
if(typeof r!=="number")return r.O()
if(r<0){m=P.Y("Negative UTF-8 code unit: -0x"+C.d.bb(-r,16),a,n-1)
throw H.a(m)}else{if((r&224)===192){z=r&31
y=1
x=1
continue $label0$0}if((r&240)===224){z=r&15
y=2
x=2
continue $label0$0}if((r&248)===240&&r<245){z=r&7
y=3
x=3
continue $label0$0}m=P.Y("Bad UTF-8 encoding 0x"+C.d.bb(r,16),a,n-1)
throw H.a(m)}}break $label0$0}if(y>0){this.d=z
this.e=y
this.f=x}}},lW:{"^":"n:41;a",
$2:function(a,b){var z,y,x,w
H.w(a,"$isc",[P.m],"$asc")
z=this.a
for(y=J.aH(a),x=b;x<z;++x){w=y.k(a,x)
if(typeof w!=="number")return w.bI()
if((w&127)!==w)return x-b}return z-b}},lV:{"^":"n:42;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.c6(this.d,a,b)}}}],["","",,P,{"^":"",
cc:function(a,b,c){var z
H.h(b,{func:1,ret:P.m,args:[P.i]})
z=H.iR(a,c)
if(z!=null)return z
if(b!=null)return b.$1(a)
throw H.a(P.Y(a,null,null))},
hK:function(a){var z=J.O(a)
if(!!z.$isn)return z.i(a)
return"Instance of '"+H.bd(a)+"'"},
id:function(a,b,c,d){var z,y
H.z(b,d)
z=J.hX(a,d)
if(a!==0&&!0)for(y=0;y<z.length;++y)C.a.m(z,y,b)
return H.w(z,"$isc",[d],"$asc")},
ie:function(a,b,c){var z,y,x
z=[c]
y=H.e([],z)
for(x=a.ga0(a);x.I();)C.a.h(y,H.z(x.gT(x),c))
if(b)return y
return H.w(J.bE(y),"$isc",z,"$asc")},
c6:function(a,b,c){var z,y
z=P.m
H.w(a,"$isk",[z],"$ask")
if(typeof a==="object"&&a!==null&&a.constructor===Array){H.w(a,"$isb9",[z],"$asb9")
y=a.length
c=P.aM(b,c,y,null,null,null)
if(b<=0){if(typeof c!=="number")return c.O()
z=c<y}else z=!0
return H.ew(z?C.a.bK(a,b,c):a)}if(!!J.O(a).$isd7)return H.iT(a,b,P.aM(b,c,a.length,null,null,null))
return P.jq(a,b,c)},
jq:function(a,b,c){var z,y,x,w
H.w(a,"$isk",[P.m],"$ask")
if(b<0)throw H.a(P.a0(b,0,J.au(a),null,null))
z=c==null
if(!z&&c<b)throw H.a(P.a0(c,b,J.au(a),null,null))
y=J.by(a)
for(x=0;x<b;++x)if(!y.I())throw H.a(P.a0(b,0,x,null,null))
w=[]
if(z)for(;y.I();)w.push(y.gT(y))
else for(x=b;x<c;++x){if(!y.I())throw H.a(P.a0(c,b,x,null,null))
w.push(y.gT(y))}return H.ew(w)},
j_:function(a,b,c){return new H.i_(a,H.i0(a,!1,!0,!1))},
f8:function(){var z=H.iJ()
if(z!=null)return P.jW(z,0,null)
throw H.a(P.C("'Uri.base' is not supported"))},
ck:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ab(a)
if(typeof a==="string")return JSON.stringify(a)
return P.hK(a)},
v:function(a){return new P.fi(a)},
ig:function(a,b,c,d){var z,y
H.h(b,{func:1,ret:d,args:[P.m]})
z=H.e([],[d])
C.a.sl(z,a)
for(y=0;y<a;++y)C.a.m(z,y,b.$1(y))
return z},
dE:function(a){H.mX(a)},
jW:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
c=a.length
z=b+5
if(c>=z){y=((C.b.H(a,b+4)^58)*3|C.b.H(a,b)^100|C.b.H(a,b+1)^97|C.b.H(a,b+2)^116|C.b.H(a,b+3)^97)>>>0
if(y===0)return P.f7(b>0||c<c?C.b.v(a,b,c):a,5,null).gef()
else if(y===32)return P.f7(C.b.v(a,z,c),0,null).gef()}x=new Array(8)
x.fixed$length=Array
w=H.e(x,[P.m])
C.a.m(w,0,0)
x=b-1
C.a.m(w,1,x)
C.a.m(w,2,x)
C.a.m(w,7,x)
C.a.m(w,3,b)
C.a.m(w,4,b)
C.a.m(w,5,c)
C.a.m(w,6,c)
if(P.fH(a,b,c,0,w)>=14)C.a.m(w,7,c)
v=w[1]
if(typeof v!=="number")return v.cL()
if(v>=b)if(P.fH(a,b,v,20,w)===20)w[7]=v
x=w[2]
if(typeof x!=="number")return x.D()
u=x+1
t=w[3]
s=w[4]
r=w[5]
q=w[6]
if(typeof q!=="number")return q.O()
if(typeof r!=="number")return H.p(r)
if(q<r)r=q
if(typeof s!=="number")return s.O()
if(s<u||s<=v)s=r
if(typeof t!=="number")return t.O()
if(t<u)t=s
x=w[7]
if(typeof x!=="number")return x.O()
p=x<b
if(p)if(u>v+3){o=null
p=!1}else{x=t>b
if(x&&t+1===s){o=null
p=!1}else{if(!(r<c&&r===s+2&&C.b.a6(a,"..",s)))n=r>s+2&&C.b.a6(a,"/..",r-3)
else n=!0
if(n){o=null
p=!1}else{if(v===b+4)if(C.b.a6(a,"file",b)){if(u<=b){if(!C.b.a6(a,"/",s)){m="file:///"
y=3}else{m="file://"
y=2}a=m+C.b.v(a,s,c)
v-=b
z=y-b
r+=z
q+=z
c=a.length
b=0
u=7
t=7
s=7}else if(s===r)if(b===0&&!0){a=C.b.aT(a,s,r,"/");++r;++q;++c}else{a=C.b.v(a,b,s)+"/"+C.b.v(a,r,c)
v-=b
u-=b
t-=b
s-=b
z=1-b
r+=z
q+=z
c=a.length
b=0}o="file"}else if(C.b.a6(a,"http",b)){if(x&&t+3===s&&C.b.a6(a,"80",t+1))if(b===0&&!0){a=C.b.aT(a,t,s,"")
s-=3
r-=3
q-=3
c-=3}else{a=C.b.v(a,b,t)+C.b.v(a,s,c)
v-=b
u-=b
t-=b
z=3+b
s-=z
r-=z
q-=z
c=a.length
b=0}o="http"}else o=null
else if(v===z&&C.b.a6(a,"https",b)){if(x&&t+4===s&&C.b.a6(a,"443",t+1))if(b===0&&!0){a=C.b.aT(a,t,s,"")
s-=4
r-=4
q-=4
c-=3}else{a=C.b.v(a,b,t)+C.b.v(a,s,c)
v-=b
u-=b
t-=b
z=4+b
s-=z
r-=z
q-=z
c=a.length
b=0}o="https"}else o=null
p=!0}}}else o=null
if(p){if(b>0||c<a.length){a=C.b.v(a,b,c)
v-=b
u-=b
t-=b
s-=b
r-=b
q-=b}return new P.lg(a,v,u,t,s,r,q,o)}return P.lD(a,b,c,v,u,t,s,r,q,o)},
fa:function(a,b){var z=P.i
return C.a.hz(H.e(a.split("&"),[z]),P.ei(z,z),new P.jZ(b),[P.J,P.i,P.i])},
jU:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=new P.jV(a)
y=new Uint8Array(4)
for(x=y.length,w=b,v=w,u=0;w<c;++w){t=C.b.X(a,w)
if(t!==46){if((t^48)>9)z.$2("invalid character",w)}else{if(u===3)z.$2("IPv4 address should contain exactly 4 parts",w)
s=P.cc(C.b.v(a,v,w),null,null)
if(typeof s!=="number")return s.cN()
if(s>255)z.$2("each part must be in the range 0..255",v)
r=u+1
if(u>=x)return H.d(y,u)
y[u]=s
v=w+1
u=r}}if(u!==3)z.$2("IPv4 address should contain exactly 4 parts",c)
s=P.cc(C.b.v(a,v,c),null,null)
if(typeof s!=="number")return s.cN()
if(s>255)z.$2("each part must be in the range 0..255",v)
if(u>=x)return H.d(y,u)
y[u]=s
return y},
f9:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
if(c==null)c=a.length
z=new P.jX(a)
y=new P.jY(z,a)
if(a.length<2)z.$1("address is too short")
x=H.e([],[P.m])
for(w=b,v=w,u=!1,t=!1;w<c;++w){s=C.b.X(a,w)
if(s===58){if(w===b){++w
if(C.b.X(a,w)!==58)z.$2("invalid start colon.",w)
v=w}if(w===v){if(u)z.$2("only one wildcard `::` is allowed",w)
C.a.h(x,-1)
u=!0}else C.a.h(x,y.$2(v,w))
v=w+1}else if(s===46)t=!0}if(x.length===0)z.$1("too few parts")
r=v===c
q=C.a.gaA(x)
if(r&&q!==-1)z.$2("expected a part after last `:`",c)
if(!r)if(!t)C.a.h(x,y.$2(v,c))
else{p=P.jU(a,v,c)
C.a.h(x,(p[0]<<8|p[1])>>>0)
C.a.h(x,(p[2]<<8|p[3])>>>0)}if(u){if(x.length>7)z.$1("an address with a wildcard must have less than 7 parts")}else if(x.length!==8)z.$1("an address without a wildcard must contain exactly 8 parts")
o=new Uint8Array(16)
for(q=x.length,n=o.length,m=9-q,w=0,l=0;w<q;++w){k=x[w]
if(k===-1)for(j=0;j<m;++j){if(l<0||l>=n)return H.d(o,l)
o[l]=0
i=l+1
if(i>=n)return H.d(o,i)
o[i]=0
l+=2}else{i=C.d.aJ(k,8)
if(l<0||l>=n)return H.d(o,l)
o[l]=i
i=l+1
if(i>=n)return H.d(o,i)
o[i]=k&255
l+=2}}return o},
ma:function(){var z,y,x,w,v
z=P.ig(22,new P.mc(),!0,P.R)
y=new P.mb(z)
x=new P.md()
w=new P.me()
v=H.f(y.$2(0,225),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,".",14)
x.$3(v,":",34)
x.$3(v,"/",3)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(14,225),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,".",15)
x.$3(v,":",34)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(15,225),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,"%",225)
x.$3(v,":",34)
x.$3(v,"/",9)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(1,225),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,":",34)
x.$3(v,"/",10)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(2,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",139)
x.$3(v,"/",131)
x.$3(v,".",146)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(3,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",68)
x.$3(v,".",18)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(4,229),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",5)
w.$3(v,"AZ",229)
x.$3(v,":",102)
x.$3(v,"@",68)
x.$3(v,"[",232)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(5,229),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",5)
w.$3(v,"AZ",229)
x.$3(v,":",102)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(6,231),"$isR")
w.$3(v,"19",7)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(7,231),"$isR")
w.$3(v,"09",7)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
x.$3(H.f(y.$2(8,8),"$isR"),"]",5)
v=H.f(y.$2(9,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",16)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(16,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",17)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(17,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",9)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(10,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",18)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(18,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",19)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(19,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(11,235),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",10)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=H.f(y.$2(12,236),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",12)
x.$3(v,"?",12)
x.$3(v,"#",205)
v=H.f(y.$2(13,237),"$isR")
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",13)
x.$3(v,"?",13)
w.$3(H.f(y.$2(20,245),"$isR"),"az",21)
v=H.f(y.$2(21,245),"$isR")
w.$3(v,"az",21)
w.$3(v,"09",21)
x.$3(v,"+-.",21)
return z},
fH:function(a,b,c,d,e){var z,y,x,w,v
H.w(e,"$isc",[P.m],"$asc")
z=$.$get$fI()
for(y=b;y<c;++y){if(d<0||d>=z.length)return H.d(z,d)
x=z[d]
w=C.b.H(a,y)^96
if(w>95)w=31
if(w>=x.length)return H.d(x,w)
v=x[w]
d=v&31
C.a.m(e,v>>>5,y)}return d},
ai:{"^":"b;"},
"+bool":0,
am:{"^":"b;a,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.am))return!1
return this.a===b.a&&this.b===b.b},
gU:function(a){var z=this.a
return(z^C.d.aJ(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t
z=P.hz(H.iQ(this))
y=P.c0(H.iO(this))
x=P.c0(H.iK(this))
w=P.c0(H.iL(this))
v=P.c0(H.iN(this))
u=P.c0(H.iP(this))
t=P.hA(H.iM(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
p:{
hz:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
hA:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c0:function(a){if(a>=10)return""+a
return"0"+a}}},
q:{"^":"X;"},
"+double":0,
b6:{"^":"b;a",
j:function(a,b){return new P.b6(C.d.ab(this.a*b))},
O:function(a,b){return C.d.O(this.a,H.f(b,"$isb6").a)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.b6))return!1
return this.a===b.a},
gU:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.hF()
y=this.a
if(y<0)return"-"+new P.b6(0-y).i(0)
x=z.$1(C.d.a3(y,6e7)%60)
w=z.$1(C.d.a3(y,1e6)%60)
v=new P.hE().$1(y%1e6)
return""+C.d.a3(y,36e8)+":"+H.l(x)+":"+H.l(w)+"."+H.l(v)},
p:{
e5:function(a,b,c,d,e,f){return new P.b6(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
hE:{"^":"n:25;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hF:{"^":"n:25;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a6:{"^":"b;"},
es:{"^":"a6;",
i:function(a){return"Throw of null."}},
aI:{"^":"a6;a,b,c,d",
gbR:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbQ:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.l(z)
w=this.gbR()+y+x
if(!this.a)return w
v=this.gbQ()
u=P.ck(this.b)
return w+v+": "+H.l(u)},
p:{
ce:function(a){return new P.aI(!1,null,null,a)},
cf:function(a,b,c){return new P.aI(!0,a,b,c)},
dK:function(a){return new P.aI(!1,null,a,"Must not be null")}}},
ct:{"^":"aI;e,f,a,b,c,d",
gbR:function(){return"RangeError"},
gbQ:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.l(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.l(z)
else if(x>z)y=": Not in range "+H.l(z)+".."+H.l(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.l(z)}return y},
p:{
cu:function(a,b,c){return new P.ct(null,null,!0,a,b,"Value not in range")},
a0:function(a,b,c,d,e){return new P.ct(b,c,!0,a,d,"Invalid value")},
aM:function(a,b,c,d,e,f){var z
if(typeof a!=="number")return H.p(a)
if(0<=a){if(typeof c!=="number")return H.p(c)
z=a>c}else z=!0
if(z)throw H.a(P.a0(a,0,c,"start",f))
if(b!=null){if(!(a>b)){if(typeof c!=="number")return H.p(c)
z=b>c}else z=!0
if(z)throw H.a(P.a0(b,a,c,"end",f))
return b}return c}}},
hT:{"^":"aI;e,l:f>,a,b,c,d",
gbR:function(){return"RangeError"},
gbQ:function(){if(J.h7(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.l(z)},
p:{
S:function(a,b,c,d,e){var z=H.D(e!=null?e:J.au(b))
return new P.hT(b,z,!0,a,c,"Index out of range")}}},
jS:{"^":"a6;a",
i:function(a){return"Unsupported operation: "+this.a},
p:{
C:function(a){return new P.jS(a)}}},
jP:{"^":"a6;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
p:{
c7:function(a){return new P.jP(a)}}},
jk:{"^":"a6;a",
i:function(a){return"Bad state: "+this.a}},
ht:{"^":"a6;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.l(P.ck(z))+"."},
p:{
b4:function(a){return new P.ht(a)}}},
iF:{"^":"b;",
i:function(a){return"Out of Memory"},
$isa6:1},
eD:{"^":"b;",
i:function(a){return"Stack Overflow"},
$isa6:1},
hy:{"^":"a6;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
fi:{"^":"b;a",
i:function(a){return"Exception: "+this.a}},
hQ:{"^":"b;a,b,c",
i:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.l(x)+")"):y
if(x!=null)z=x<0||x>w.length
else z=!1
if(z)x=null
if(x==null){if(w.length>78)w=C.b.v(w,0,75)+"..."
return y+"\n"+w}for(v=1,u=0,t=!1,s=0;s<x;++s){r=C.b.H(w,s)
if(r===10){if(u!==s||!t)++v
u=s+1
t=!1}else if(r===13){++v
u=s+1
t=!0}}y=v>1?y+(" (at line "+v+", character "+(x-u+1)+")\n"):y+(" (at character "+(x+1)+")\n")
q=w.length
for(s=x;s<w.length;++s){r=C.b.X(w,s)
if(r===10||r===13){q=s
break}}if(q-u>78)if(x-u<75){p=u+75
o=u
n=""
m="..."}else{if(q-x<75){o=q-75
p=q
m=""}else{o=x-36
p=x+36
m="..."}n="..."}else{p=q
o=u
n=""
m=""}l=C.b.v(w,o,p)
return y+n+l+m+"\n"+C.b.j(" ",x-o+n.length)+"^\n"},
p:{
Y:function(a,b,c){return new P.hQ(a,b,c)}}},
m:{"^":"X;"},
"+int":0,
k:{"^":"b;$ti",
gl:function(a){var z,y
z=this.ga0(this)
for(y=0;z.I();)++y
return y},
J:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(P.dK("index"))
if(b<0)H.t(P.a0(b,0,null,"index",null))
for(z=this.ga0(this),y=0;z.I();){x=z.gT(z)
if(b===y)return x;++y}throw H.a(P.S(b,this,"index",null,y))},
i:function(a){return P.hV(this,"(",")")}},
cX:{"^":"b;$ti"},
c:{"^":"b;$ti",$isk:1},
"+List":0,
J:{"^":"b;$ti"},
G:{"^":"b;",
gU:function(a){return P.b.prototype.gU.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
X:{"^":"b;"},
"+num":0,
b:{"^":";",
u:function(a,b){return this===b},
gU:function(a){return H.bM(this)},
i:function(a){return"Instance of '"+H.bd(this)+"'"},
toString:function(){return this.i(this)}},
aw:{"^":"b;"},
i:{"^":"b;",$iset:1},
"+String":0,
ao:{"^":"b;aG:a<",
gl:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
$isoE:1,
p:{
eG:function(a,b,c){var z=J.by(b)
if(!z.I())return a
if(c.length===0){do a+=H.l(z.gT(z))
while(z.I())}else{a+=H.l(z.gT(z))
for(;z.I();)a=a+c+H.l(z.gT(z))}return a}}},
jZ:{"^":"n:38;a",
$2:function(a,b){var z,y,x,w
z=P.i
H.w(a,"$isJ",[z,z],"$asJ")
H.M(b)
y=J.aH(b).dU(b,"=")
if(y===-1){if(b!=="")J.cJ(a,P.dr(b,0,b.length,this.a,!0),"")}else if(y!==0){x=C.b.v(b,0,y)
w=C.b.aB(b,y+1)
z=this.a
J.cJ(a,P.dr(x,0,x.length,z,!0),P.dr(w,0,w.length,z,!0))}return a}},
jV:{"^":"n:30;a",
$2:function(a,b){throw H.a(P.Y("Illegal IPv4 address, "+a,this.a,b))}},
jX:{"^":"n:49;a",
$2:function(a,b){throw H.a(P.Y("Illegal IPv6 address, "+a,this.a,b))},
$1:function(a){return this.$2(a,null)}},
jY:{"^":"n:43;a,b",
$2:function(a,b){var z
if(b-a>4)this.a.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
z=P.cc(C.b.v(this.b,a,b),null,16)
if(typeof z!=="number")return z.O()
if(z<0||z>65535)this.a.$2("each part must be in the range of `0x0..0xFFFF`",a)
return z}},
cy:{"^":"b;bJ:a<,b,c,d,e2:e>,f,r,0x,0y,0z,0Q,0ch",
geg:function(){return this.b},
gcq:function(a){var z=this.c
if(z==null)return""
if(C.b.a5(z,"["))return C.b.v(z,1,z.length-1)
return z},
gbF:function(a){var z=this.d
if(z==null)return P.fx(this.a)
return z},
gcB:function(a){var z=this.f
return z==null?"":z},
gdP:function(){var z=this.r
return z==null?"":z},
cF:function(a,b,c,d,e,f,g,h,i,j){var z,y,x
H.w(h,"$isJ",[P.i,null],"$asJ")
i=this.a
z=i==="file"
j=this.b
f=this.d
y=this.c
if(y!=null)c=y
else if(j.length!==0||f!=null||z)c=""
d=this.e
if(!z)x=c!=null&&d.length!==0
else x=!0
if(x&&!C.b.a5(d,"/"))d="/"+d
g=P.dq(g,0,0,h)
return new P.cy(i,j,c,f,d,g,this.r)},
e7:function(a,b){return this.cF(a,null,null,null,null,null,null,b,null,null)},
gcC:function(){var z,y
z=this.Q
if(z==null){z=this.f
y=P.i
y=new P.f6(P.fa(z==null?"":z,C.k),[y,y])
this.Q=y
z=y}return z},
gdQ:function(){return this.c!=null},
gdT:function(){return this.f!=null},
gdR:function(){return this.r!=null},
i:function(a){var z,y,x,w
z=this.y
if(z==null){z=this.a
y=z.length!==0?H.l(z)+":":""
x=this.c
w=x==null
if(!w||z==="file"){z=y+"//"
y=this.b
if(y.length!==0)z=z+H.l(y)+"@"
if(!w)z+=x
y=this.d
if(y!=null)z=z+":"+H.l(y)}else z=y
z+=this.e
y=this.f
if(y!=null)z=z+"?"+y
y=this.r
if(y!=null)z=z+"#"+y
z=z.charCodeAt(0)==0?z:z
this.y=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(this===b)return!0
z=J.O(b)
if(!!z.$isdj){y=this.a
x=b.gbJ()
if(y==null?x==null:y===x)if(this.c!=null===b.gdQ()){y=this.b
x=b.geg()
if(y==null?x==null:y===x){y=this.gcq(this)
x=z.gcq(b)
if(y==null?x==null:y===x){y=this.gbF(this)
x=z.gbF(b)
if(y==null?x==null:y===x)if(this.e===z.ge2(b)){y=this.f
x=y==null
if(!x===b.gdT()){if(x)y=""
if(y===z.gcB(b)){z=this.r
y=z==null
if(!y===b.gdR()){if(y)z=""
z=z===b.gdP()}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z}return!1},
gU:function(a){var z=this.z
if(z==null){z=C.b.gU(this.i(0))
this.z=z}return z},
$isdj:1,
p:{
cz:function(a,b,c,d){var z,y,x,w,v,u
H.w(a,"$isc",[P.m],"$asc")
if(c===C.k){z=$.$get$fC().b
if(typeof b!=="string")H.t(H.ah(b))
z=z.test(b)}else z=!1
if(z)return b
H.z(b,H.ay(c,"c_",0))
y=c.ghw().cf(b)
for(z=y.length,x=0,w="";x<z;++x){v=y[x]
if(v<128){u=v>>>4
if(u>=8)return H.d(a,u)
u=(a[u]&1<<(v&15))!==0}else u=!1
if(u)w+=H.cs(v)
else w=d&&v===32?w+"+":w+"%"+"0123456789ABCDEF"[v>>>4&15]+"0123456789ABCDEF"[v&15]}return w.charCodeAt(0)==0?w:w},
lD:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u,t
if(j==null)if(d>b)j=P.lO(a,b,d)
else{if(d===b)P.bT(a,b,"Invalid empty scheme")
j=""}if(e>b){z=d+3
y=z<e?P.lP(a,z,e-1):""
x=P.lI(a,e,f,!1)
if(typeof f!=="number")return f.D()
w=f+1
if(typeof g!=="number")return H.p(g)
v=w<g?P.lL(P.cc(C.b.v(a,w,g),new P.lE(a,f),null),j):null}else{y=""
x=null
v=null}u=P.lJ(a,g,h,null,j,x!=null)
if(typeof h!=="number")return h.O()
t=h<i?P.dq(a,h+1,i,null):null
return new P.cy(j,y,x,v,u,t,i<c?P.lH(a,i+1,c):null)},
fx:function(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
bT:function(a,b,c){throw H.a(P.Y(c,a,b))},
lL:function(a,b){if(a!=null&&a===P.fx(b))return
return a},
lI:function(a,b,c,d){var z,y
if(b===c)return""
if(C.b.X(a,b)===91){if(typeof c!=="number")return c.M()
z=c-1
if(C.b.X(a,z)!==93)P.bT(a,b,"Missing end `]` to match `[` in host")
P.f9(a,b+1,z)
return C.b.v(a,b,c).toLowerCase()}if(typeof c!=="number")return H.p(c)
y=b
for(;y<c;++y)if(C.b.X(a,y)===58){P.f9(a,b,c)
return"["+a+"]"}return P.lR(a,b,c)},
lR:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
if(typeof c!=="number")return H.p(c)
z=b
y=z
x=null
w=!0
for(;z<c;){v=C.b.X(a,z)
if(v===37){u=P.fE(a,z,!0)
t=u==null
if(t&&w){z+=3
continue}if(x==null)x=new P.ao("")
s=C.b.v(a,y,z)
r=x.a+=!w?s.toLowerCase():s
if(t){u=C.b.v(a,z,z+3)
q=3}else if(u==="%"){u="%25"
q=1}else q=3
x.a=r+u
z+=q
y=z
w=!0}else{if(v<127){t=v>>>4
if(t>=8)return H.d(C.x,t)
t=(C.x[t]&1<<(v&15))!==0}else t=!1
if(t){if(w&&65<=v&&90>=v){if(x==null)x=new P.ao("")
if(y<z){x.a+=C.b.v(a,y,z)
y=z}w=!1}++z}else{if(v<=93){t=v>>>4
if(t>=8)return H.d(C.m,t)
t=(C.m[t]&1<<(v&15))!==0}else t=!1
if(t)P.bT(a,z,"Invalid character")
else{if((v&64512)===55296&&z+1<c){p=C.b.X(a,z+1)
if((p&64512)===56320){v=65536|(v&1023)<<10|p&1023
q=2}else q=1}else q=1
if(x==null)x=new P.ao("")
s=C.b.v(a,y,z)
x.a+=!w?s.toLowerCase():s
x.a+=P.fy(v)
z+=q
y=z}}}}if(x==null)return C.b.v(a,b,c)
if(y<c){s=C.b.v(a,y,c)
x.a+=!w?s.toLowerCase():s}t=x.a
return t.charCodeAt(0)==0?t:t},
lO:function(a,b,c){var z,y,x,w
if(b===c)return""
if(!P.fA(C.b.H(a,b)))P.bT(a,b,"Scheme not starting with alphabetic character")
for(z=b,y=!1;z<c;++z){x=C.b.H(a,z)
if(x<128){w=x>>>4
if(w>=8)return H.d(C.o,w)
w=(C.o[w]&1<<(x&15))!==0}else w=!1
if(!w)P.bT(a,z,"Illegal scheme character")
if(65<=x&&x<=90)y=!0}a=C.b.v(a,b,c)
return P.lF(y?a.toLowerCase():a)},
lF:function(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
lP:function(a,b,c){return P.bU(a,b,c,C.Q)},
lJ:function(a,b,c,d,e,f){var z,y,x,w
z=e==="file"
y=z||f
x=a==null
if(x&&!0)return z?"/":""
w=!x?P.bU(a,b,c,C.y):C.t.iW(d,new P.lK(),P.i).E(0,"/")
if(w.length===0){if(z)return"/"}else if(y&&!C.b.a5(w,"/"))w="/"+w
return P.lQ(w,e,f)},
lQ:function(a,b,c){var z=b.length===0
if(z&&!c&&!C.b.a5(a,"/"))return P.lS(a,!z||c)
return P.lT(a)},
dq:function(a,b,c,d){var z,y
z={}
H.w(d,"$isJ",[P.i,null],"$asJ")
if(a!=null){if(d!=null)throw H.a(P.ce("Both query and queryParameters specified"))
return P.bU(a,b,c,C.n)}if(d==null)return
y=new P.ao("")
z.a=""
d.L(0,new P.lM(new P.lN(z,y)))
z=y.a
return z.charCodeAt(0)==0?z:z},
lH:function(a,b,c){return P.bU(a,b,c,C.n)},
fE:function(a,b,c){var z,y,x,w,v,u
z=b+2
if(z>=a.length)return"%"
y=C.b.X(a,b+1)
x=C.b.X(a,z)
w=H.cF(y)
v=H.cF(x)
if(w<0||v<0)return"%"
u=w*16+v
if(u<127){z=C.d.aJ(u,4)
if(z>=8)return H.d(C.p,z)
z=(C.p[z]&1<<(u&15))!==0}else z=!1
if(z)return H.cs(c&&65<=u&&90>=u?(u|32)>>>0:u)
if(y>=97||x>=97)return C.b.v(a,b,b+3).toUpperCase()
return},
fy:function(a){var z,y,x,w,v,u
if(a<128){z=new Array(3)
z.fixed$length=Array
y=H.e(z,[P.m])
C.a.m(y,0,37)
C.a.m(y,1,C.b.H("0123456789ABCDEF",a>>>4))
C.a.m(y,2,C.b.H("0123456789ABCDEF",a&15))}else{if(a>2047)if(a>65535){x=240
w=4}else{x=224
w=3}else{x=192
w=2}z=new Array(3*w)
z.fixed$length=Array
y=H.e(z,[P.m])
for(v=0;--w,w>=0;x=128){u=C.d.fL(a,6*w)&63|x
C.a.m(y,v,37)
C.a.m(y,v+1,C.b.H("0123456789ABCDEF",u>>>4))
C.a.m(y,v+2,C.b.H("0123456789ABCDEF",u&15))
v+=3}}return P.c6(y,0,null)},
bU:function(a,b,c,d){var z=P.fD(a,b,c,H.w(d,"$isc",[P.m],"$asc"),!1)
return z==null?C.b.v(a,b,c):z},
fD:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
H.w(d,"$isc",[P.m],"$asc")
z=!e
y=b
x=y
w=null
while(!0){if(typeof y!=="number")return y.O()
if(typeof c!=="number")return H.p(c)
if(!(y<c))break
c$0:{v=C.b.X(a,y)
if(v<127){u=v>>>4
if(u>=8)return H.d(d,u)
u=(d[u]&1<<(v&15))!==0}else u=!1
if(u)++y
else{if(v===37){t=P.fE(a,y,!1)
if(t==null){y+=3
break c$0}if("%"===t){t="%25"
s=1}else s=3}else{if(z)if(v<=93){u=v>>>4
if(u>=8)return H.d(C.m,u)
u=(C.m[u]&1<<(v&15))!==0}else u=!1
else u=!1
if(u){P.bT(a,y,"Invalid character")
t=null
s=null}else{if((v&64512)===55296){u=y+1
if(u<c){r=C.b.X(a,u)
if((r&64512)===56320){v=65536|(v&1023)<<10|r&1023
s=2}else s=1}else s=1}else s=1
t=P.fy(v)}}if(w==null)w=new P.ao("")
w.a+=C.b.v(a,x,y)
w.a+=H.l(t)
if(typeof s!=="number")return H.p(s)
y+=s
x=y}}}if(w==null)return
if(typeof x!=="number")return x.O()
if(x<c)w.a+=C.b.v(a,x,c)
z=w.a
return z.charCodeAt(0)==0?z:z},
fB:function(a){if(C.b.a5(a,"."))return!0
return C.b.dU(a,"/.")!==-1},
lT:function(a){var z,y,x,w,v,u,t
if(!P.fB(a))return a
z=H.e([],[P.i])
for(y=a.split("/"),x=y.length,w=!1,v=0;v<x;++v){u=y[v]
if(J.P(u,"..")){t=z.length
if(t!==0){if(0>=t)return H.d(z,-1)
z.pop()
if(z.length===0)C.a.h(z,"")}w=!0}else if("."===u)w=!0
else{C.a.h(z,u)
w=!1}}if(w)C.a.h(z,"")
return C.a.E(z,"/")},
lS:function(a,b){var z,y,x,w,v,u
if(!P.fB(a))return!b?P.fz(a):a
z=H.e([],[P.i])
for(y=a.split("/"),x=y.length,w=!1,v=0;v<x;++v){u=y[v]
if(".."===u)if(z.length!==0&&C.a.gaA(z)!==".."){if(0>=z.length)return H.d(z,-1)
z.pop()
w=!0}else{C.a.h(z,"..")
w=!1}else if("."===u)w=!0
else{C.a.h(z,u)
w=!1}}y=z.length
if(y!==0)if(y===1){if(0>=y)return H.d(z,0)
y=z[0].length===0}else y=!1
else y=!0
if(y)return"./"
if(w||C.a.gaA(z)==="..")C.a.h(z,"")
if(!b){if(0>=z.length)return H.d(z,0)
C.a.m(z,0,P.fz(z[0]))}return C.a.E(z,"/")},
fz:function(a){var z,y,x,w
z=a.length
if(z>=2&&P.fA(J.h8(a,0)))for(y=1;y<z;++y){x=C.b.H(a,y)
if(x===58)return C.b.v(a,0,y)+"%3A"+C.b.aB(a,y+1)
if(x<=127){w=x>>>4
if(w>=8)return H.d(C.o,w)
w=(C.o[w]&1<<(x&15))===0}else w=!0
if(w)break}return a},
lG:function(a,b){var z,y,x
for(z=0,y=0;y<2;++y){x=C.b.H(a,b+y)
if(48<=x&&x<=57)z=z*16+x-48
else{x|=32
if(97<=x&&x<=102)z=z*16+x-87
else throw H.a(P.ce("Invalid URL encoding"))}}return z},
dr:function(a,b,c,d,e){var z,y,x,w,v,u
y=J.dA(a)
x=b
while(!0){if(!(x<c)){z=!0
break}w=y.H(a,x)
if(w<=127)if(w!==37)v=w===43
else v=!0
else v=!0
if(v){z=!1
break}++x}if(z){if(C.k!==d)v=!1
else v=!0
if(v)return y.v(a,b,c)
else u=new H.a5(y.v(a,b,c))}else{u=H.e([],[P.m])
for(x=b;x<c;++x){w=y.H(a,x)
if(w>127)throw H.a(P.ce("Illegal percent encoding in URI"))
if(w===37){if(x+3>a.length)throw H.a(P.ce("Truncated URI"))
C.a.h(u,P.lG(a,x+1))
x+=2}else if(w===43)C.a.h(u,32)
else C.a.h(u,w)}}H.w(u,"$isc",[P.m],"$asc")
return new P.k4(!1).cf(u)},
fA:function(a){var z=a|32
return 97<=z&&z<=122}}},
lE:{"^":"n:47;a,b",
$1:function(a){var z=this.b
if(typeof z!=="number")return z.D()
throw H.a(P.Y("Invalid port",this.a,z+1))}},
lK:{"^":"n:46;",
$1:function(a){return P.cz(C.S,a,C.k,!1)}},
lN:{"^":"n:17;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a
z.a+=y.a
y.a="&"
y=z.a+=H.l(P.cz(C.p,a,C.k,!0))
if(b!=null&&b.length!==0){z.a=y+"="
z.a+=H.l(P.cz(C.p,b,C.k,!0))}}},
lM:{"^":"n:50;a",
$2:function(a,b){var z,y
H.M(a)
if(b==null||typeof b==="string")this.a.$2(a,H.M(b))
else for(z=J.by(H.fZ(b,"$isk")),y=this.a;z.I();)y.$2(a,H.M(z.gT(z)))}},
jT:{"^":"b;a,b,c",
gef:function(){var z,y,x,w,v
z=this.c
if(z!=null)return z
z=this.b
if(0>=z.length)return H.d(z,0)
y=this.a
z=z[0]+1
x=C.b.dV(y,"?",z)
w=y.length
if(x>=0){v=P.bU(y,x+1,w,C.n)
w=x}else v=null
z=new P.kz(this,"data",null,null,null,P.bU(y,z,w,C.y),v,null)
this.c=z
return z},
i:function(a){var z,y
z=this.b
if(0>=z.length)return H.d(z,0)
y=this.a
return z[0]===-1?"data:"+y:y},
p:{
f7:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=H.e([b-1],[P.m])
for(y=a.length,x=b,w=-1,v=null;x<y;++x){v=C.b.H(a,x)
if(v===44||v===59)break
if(v===47){if(w<0){w=x
continue}throw H.a(P.Y("Invalid MIME type",a,x))}}if(w<0&&x>b)throw H.a(P.Y("Invalid MIME type",a,x))
for(;v!==44;){C.a.h(z,x);++x
for(u=-1;x<y;++x){v=C.b.H(a,x)
if(v===61){if(u<0)u=x}else if(v===59||v===44)break}if(u>=0)C.a.h(z,u)
else{t=C.a.gaA(z)
if(v!==44||x!==t+7||!C.b.a6(a,"base64",t+1))throw H.a(P.Y("Expecting '='",a,x))
break}}C.a.h(z,x)
s=x+1
if((z.length&1)===1)a=C.C.hO(0,a,s,y)
else{r=P.fD(a,s,y,C.n,!0)
if(r!=null)a=C.b.aT(a,s,y,r)}return new P.jT(a,z,c)}}},
mc:{"^":"n:45;",
$1:function(a){return new Uint8Array(96)}},
mb:{"^":"n:40;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.d(z,a)
z=z[a]
J.hc(z,0,96,b)
return z}},
md:{"^":"n;",
$3:function(a,b,c){var z,y,x
for(z=b.length,y=0;y<z;++y){x=C.b.H(b,y)^96
if(x>=a.length)return H.d(a,x)
a[x]=c}}},
me:{"^":"n;",
$3:function(a,b,c){var z,y,x
for(z=C.b.H(b,0),y=C.b.H(b,1);z<=y;++z){x=(z^96)>>>0
if(x>=a.length)return H.d(a,x)
a[x]=c}}},
lg:{"^":"b;a,b,c,d,e,f,r,x,0y",
gdQ:function(){return this.c>0},
gdS:function(){var z,y
if(this.c>0){z=this.d
if(typeof z!=="number")return z.D()
y=this.e
if(typeof y!=="number")return H.p(y)
y=z+1<y
z=y}else z=!1
return z},
gdT:function(){var z=this.f
if(typeof z!=="number")return z.O()
return z<this.r},
gdR:function(){return this.r<this.a.length},
gd4:function(){return this.b===4&&C.b.a5(this.a,"http")},
gd5:function(){return this.b===5&&C.b.a5(this.a,"https")},
gbJ:function(){var z,y
z=this.b
if(z<=0)return""
y=this.x
if(y!=null)return y
if(this.gd4()){this.x="http"
z="http"}else if(this.gd5()){this.x="https"
z="https"}else if(z===4&&C.b.a5(this.a,"file")){this.x="file"
z="file"}else if(z===7&&C.b.a5(this.a,"package")){this.x="package"
z="package"}else{z=C.b.v(this.a,0,z)
this.x=z}return z},
geg:function(){var z,y
z=this.c
y=this.b+3
return z>y?C.b.v(this.a,y,z-1):""},
gcq:function(a){var z=this.c
return z>0?C.b.v(this.a,z,this.d):""},
gbF:function(a){var z
if(this.gdS()){z=this.d
if(typeof z!=="number")return z.D()
return P.cc(C.b.v(this.a,z+1,this.e),null,null)}if(this.gd4())return 80
if(this.gd5())return 443
return 0},
ge2:function(a){return C.b.v(this.a,this.e,this.f)},
gcB:function(a){var z,y
z=this.f
y=this.r
if(typeof z!=="number")return z.O()
return z<y?C.b.v(this.a,z+1,y):""},
gdP:function(){var z,y
z=this.r
y=this.a
return z<y.length?C.b.aB(y,z+1):""},
gcC:function(){var z=this.f
if(typeof z!=="number")return z.O()
if(z>=this.r)return C.T
z=P.i
return new P.f6(P.fa(this.gcB(this),C.k),[z,z])},
cF:function(a,b,c,d,e,f,g,h,i,j){var z,y,x
H.w(h,"$isJ",[P.i,null],"$asJ")
i=this.gbJ()
z=i==="file"
y=this.c
j=y>0?C.b.v(this.a,this.b+3,y):""
f=this.gdS()?this.gbF(this):null
y=this.c
if(y>0)c=C.b.v(this.a,y,this.d)
else if(j.length!==0||f!=null||z)c=""
y=this.a
d=C.b.v(y,this.e,this.f)
if(!z)x=c!=null&&d.length!==0
else x=!0
if(x&&!C.b.a5(d,"/"))d="/"+d
g=P.dq(g,0,0,h)
x=this.r
if(x<y.length)b=C.b.aB(y,x+1)
return new P.cy(i,j,c,f,d,g,b)},
e7:function(a,b){return this.cF(a,null,null,null,null,null,null,b,null,null)},
gU:function(a){var z=this.y
if(z==null){z=C.b.gU(this.a)
this.y=z}return z},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
z=J.O(b)
if(!!z.$isdj)return this.a===z.i(b)
return!1},
i:function(a){return this.a},
$isdj:1},
kz:{"^":"cy;cx,a,b,c,d,e,f,r,0x,0y,0z,0Q,0ch"}}],["","",,W,{"^":"",
dU:function(a,b){var z=document.createElement("canvas")
return z},
hH:function(a){H.f(a,"$isa7")
return"wheel"},
hU:function(a){var z,y,x
y=document.createElement("input")
z=H.f(y,"$iseb")
try{J.he(z,a)}catch(x){H.at(x)}return z},
cx:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fl:function(a,b,c,d){var z,y
z=W.cx(W.cx(W.cx(W.cx(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
fL:function(a,b){var z
H.h(a,{func:1,ret:-1,args:[b]})
z=$.T
if(z===C.j)return a
return z.dl(a,b)},
ac:{"^":"a1;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSlotElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
n7:{"^":"da;0q:x=,0t:y=","%":"Accelerometer|LinearAccelerationSensor"},
n8:{"^":"r;0l:length=","%":"AccessibleNodeList"},
n9:{"^":"ac;0a1:type}",
i:function(a){return String(a)},
"%":"HTMLAnchorElement"},
na:{"^":"ac;",
i:function(a){return String(a)},
"%":"HTMLAreaElement"},
cN:{"^":"r;",$iscN:1,"%":";Blob"},
ng:{"^":"ac;0a1:type}","%":"HTMLButtonElement"},
cQ:{"^":"ac;",
cM:function(a,b,c){var z=a.getContext(b,P.mp(c,null))
return z},
$iscQ:1,
"%":"HTMLCanvasElement"},
ni:{"^":"K;0l:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
nk:{"^":"ci;0l:length=","%":"CSSPerspective"},
nl:{"^":"cT;0q:x=,0t:y=","%":"CSSPositionValue"},
nm:{"^":"ci;0q:x=,0t:y=","%":"CSSRotation"},
b5:{"^":"r;",$isb5:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
nn:{"^":"ci;0q:x=,0t:y=","%":"CSSScale"},
no:{"^":"ky;0l:length=",
ej:function(a,b){var z=a.getPropertyValue(this.eJ(a,b))
return z==null?"":z},
eJ:function(a,b){var z,y
z=$.$get$dZ()
y=z[b]
if(typeof y==="string")return y
y=this.fM(a,b)
z[b]=y
return y},
fM:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.hB()+b
if(z in a)return z
return b},
gca:function(a){return a.bottom},
gan:function(a){return a.height},
gaR:function(a){return a.left},
gb9:function(a){return a.right},
gbd:function(a){return a.top},
gar:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hx:{"^":"b;",
gaR:function(a){return this.ej(a,"left")}},
cT:{"^":"r;","%":"CSSImageValue|CSSKeywordValue|CSSNumericValue|CSSResourceValue|CSSURLImageValue|CSSUnitValue;CSSStyleValue"},
ci:{"^":"r;","%":"CSSMatrixComponent|CSSSkew;CSSTransformComponent"},
np:{"^":"cT;0l:length=","%":"CSSTransformValue"},
nq:{"^":"ci;0q:x=,0t:y=","%":"CSSTranslation"},
nr:{"^":"cT;0l:length=","%":"CSSUnparsedValue"},
ns:{"^":"r;0l:length=","%":"DataTransferItemList"},
nt:{"^":"r;0q:x=,0t:y=","%":"DeviceAcceleration"},
nu:{"^":"r;",
i:function(a){return String(a)},
"%":"DOMException"},
nv:{"^":"hC;",
gq:function(a){return a.x},
gt:function(a){return a.y},
"%":"DOMPoint"},
hC:{"^":"r;",
gq:function(a){return a.x},
gt:function(a){return a.y},
"%":";DOMPointReadOnly"},
nw:{"^":"kB;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.w(c,"$isa9",[P.X],"$asa9")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[[P.a9,P.X]]},
$asx:function(){return[[P.a9,P.X]]},
$isk:1,
$ask:function(){return[[P.a9,P.X]]},
$isc:1,
$asc:function(){return[[P.a9,P.X]]},
$asB:function(){return[[P.a9,P.X]]},
"%":"ClientRectList|DOMRectList"},
hD:{"^":"r;",
i:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(this.gar(a))+" x "+H.l(this.gan(a))},
u:function(a,b){var z
if(b==null)return!1
z=H.bt(b,"$isa9",[P.X],"$asa9")
if(!z)return!1
z=J.aW(b)
return a.left===z.gaR(b)&&a.top===z.gbd(b)&&this.gar(a)===z.gar(b)&&this.gan(a)===z.gan(b)},
gU:function(a){return W.fl(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gar(a)&0x1FFFFFFF,this.gan(a)&0x1FFFFFFF)},
gca:function(a){return a.bottom},
gan:function(a){return a.height},
gaR:function(a){return a.left},
gb9:function(a){return a.right},
gbd:function(a){return a.top},
gar:function(a){return a.width},
gq:function(a){return a.x},
gt:function(a){return a.y},
$isa9:1,
$asa9:function(){return[P.X]},
"%":";DOMRectReadOnly"},
nx:{"^":"kD;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.M(c)
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[P.i]},
$asx:function(){return[P.i]},
$isk:1,
$ask:function(){return[P.i]},
$isc:1,
$asc:function(){return[P.i]},
$asB:function(){return[P.i]},
"%":"DOMStringList"},
ny:{"^":"r;0l:length=","%":"DOMTokenList"},
kx:{"^":"cp;a,b",
gl:function(a){return this.b.length},
k:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return H.f(z[b],"$isa1")},
m:function(a,b,c){var z
H.D(b)
H.f(c,"$isa1")
z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
this.a.replaceChild(c,z[b])},
h:function(a,b){this.a.appendChild(b)
return b},
ga0:function(a){var z=this.ie(this)
return new J.az(z,z.length,0,[H.y(z,0)])},
az:function(a,b,c,d){throw H.a(P.c7(null))},
$asx:function(){return[W.a1]},
$ask:function(){return[W.a1]},
$asc:function(){return[W.a1]}},
a1:{"^":"K;",
gce:function(a){return new W.kx(a,a.children)},
gbp:function(a){return P.iW(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,P.X)},
i:function(a){return a.localName},
$isa1:1,
"%":";Element"},
nz:{"^":"ac;0a1:type}","%":"HTMLEmbedElement"},
ae:{"^":"r;",$isae:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
a7:{"^":"r;",
dj:["em",function(a,b,c,d){H.h(c,{func:1,args:[W.ae]})
if(c!=null)this.eG(a,b,c,!1)}],
eG:function(a,b,c,d){return a.addEventListener(b,H.bu(H.h(c,{func:1,args:[W.ae]}),1),!1)},
$isa7:1,
"%":"AccessibleNode|Animation|ApplicationCache|BackgroundFetchRegistration|BatteryManager|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|Clipboard|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|EventSource|FileReader|FontFaceSet|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|MediaDevices|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamTrack|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OffscreenCanvas|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RemotePlayback|ScreenOrientation|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|USB|VR|VRDevice|VRDisplay|VRSession|VisualViewport|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|XMLHttpRequest|XMLHttpRequestEventTarget|XMLHttpRequestUpload|mozRTCPeerConnection|webkitRTCPeerConnection;EventTarget;fr|fs|fu|fv"},
aX:{"^":"cN;",$isaX:1,"%":"File"},
e7:{"^":"kI;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isaX")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.aX]},
$asx:function(){return[W.aX]},
$isk:1,
$ask:function(){return[W.aX]},
$isc:1,
$asc:function(){return[W.aX]},
$ise7:1,
$asB:function(){return[W.aX]},
"%":"FileList"},
nS:{"^":"a7;0l:length=","%":"FileWriter"},
nV:{"^":"ac;0l:length=","%":"HTMLFormElement"},
b8:{"^":"r;",$isb8:1,"%":"Gamepad"},
nW:{"^":"da;0q:x=,0t:y=","%":"Gyroscope"},
nX:{"^":"r;0l:length=","%":"History"},
nY:{"^":"kV;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isK")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.K]},
$asx:function(){return[W.K]},
$isk:1,
$ask:function(){return[W.K]},
$isc:1,
$asc:function(){return[W.K]},
$asB:function(){return[W.K]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
ea:{"^":"r;",$isea:1,"%":"ImageData"},
eb:{"^":"ac;0a1:type}",$iseb:1,"%":"HTMLInputElement"},
bF:{"^":"dg;",$isbF:1,"%":"KeyboardEvent"},
o2:{"^":"ac;0a1:type}","%":"HTMLLinkElement"},
o3:{"^":"r;",
i:function(a){return String(a)},
"%":"Location"},
o4:{"^":"da;0q:x=,0t:y=","%":"Magnetometer"},
o6:{"^":"r;0l:length=","%":"MediaList"},
o7:{"^":"a7;",
dj:function(a,b,c,d){H.h(c,{func:1,args:[W.ae]})
if(b==="message")a.start()
this.em(a,b,c,!1)},
"%":"MessagePort"},
o8:{"^":"l0;",
k:function(a,b){return P.aV(a.get(H.M(b)))},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[P.i,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aV(y.value[1]))}},
gao:function(a){var z=H.e([],[P.i])
this.L(a,new W.ix(z))
return z},
gl:function(a){return a.size},
m:function(a,b,c){throw H.a(P.C("Not supported"))},
$asaj:function(){return[P.i,null]},
$isJ:1,
$asJ:function(){return[P.i,null]},
"%":"MIDIInputMap"},
ix:{"^":"n:7;a",
$2:function(a,b){return C.a.h(this.a,a)}},
o9:{"^":"l1;",
k:function(a,b){return P.aV(a.get(H.M(b)))},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[P.i,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aV(y.value[1]))}},
gao:function(a){var z=H.e([],[P.i])
this.L(a,new W.iy(z))
return z},
gl:function(a){return a.size},
m:function(a,b,c){throw H.a(P.C("Not supported"))},
$asaj:function(){return[P.i,null]},
$isJ:1,
$asJ:function(){return[P.i,null]},
"%":"MIDIOutputMap"},
iy:{"^":"n:7;a",
$2:function(a,b){return C.a.h(this.a,a)}},
bb:{"^":"r;",$isbb:1,"%":"MimeType"},
oa:{"^":"l3;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbb")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bb]},
$asx:function(){return[W.bb]},
$isk:1,
$ask:function(){return[W.bb]},
$isc:1,
$asc:function(){return[W.bb]},
$asB:function(){return[W.bb]},
"%":"MimeTypeArray"},
aD:{"^":"dg;",$isaD:1,"%":"PointerEvent;DragEvent|MouseEvent"},
kw:{"^":"cp;a",
m:function(a,b,c){var z,y
H.D(b)
H.f(c,"$isK")
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.d(y,b)
z.replaceChild(c,y[b])},
ga0:function(a){var z=this.a.childNodes
return new W.e8(z,z.length,-1,[H.b_(C.V,z,"B",0)])},
az:function(a,b,c,d){throw H.a(P.C("Cannot fillRange on Node list"))},
gl:function(a){return this.a.childNodes.length},
k:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
$asx:function(){return[W.K]},
$ask:function(){return[W.K]},
$asc:function(){return[W.K]}},
K:{"^":"a7;",
i6:function(a,b){var z,y
try{z=a.parentNode
J.h9(z,b,a)}catch(y){H.at(y)}return a},
i:function(a){var z=a.nodeValue
return z==null?this.en(a):z},
fz:function(a,b,c){return a.replaceChild(b,c)},
$isK:1,
"%":"Attr|Document|DocumentFragment|DocumentType|HTMLDocument|ShadowRoot|XMLDocument;Node"},
iC:{"^":"l5;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isK")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.K]},
$asx:function(){return[W.K]},
$isk:1,
$ask:function(){return[W.K]},
$isc:1,
$asc:function(){return[W.K]},
$asB:function(){return[W.K]},
"%":"NodeList|RadioNodeList"},
oi:{"^":"ac;0a1:type}","%":"HTMLOListElement"},
oj:{"^":"ac;0a1:type}","%":"HTMLObjectElement"},
bc:{"^":"r;0l:length=",$isbc:1,"%":"Plugin"},
on:{"^":"l9;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbc")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bc]},
$asx:function(){return[W.bc]},
$isk:1,
$ask:function(){return[W.bc]},
$isc:1,
$asc:function(){return[W.bc]},
$asB:function(){return[W.bc]},
"%":"PluginArray"},
os:{"^":"r;0a1:type}","%":"RTCSessionDescription|mozRTCSessionDescription"},
ot:{"^":"lf;",
k:function(a,b){return P.aV(a.get(H.M(b)))},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[P.i,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aV(y.value[1]))}},
gao:function(a){var z=H.e([],[P.i])
this.L(a,new W.j5(z))
return z},
gl:function(a){return a.size},
m:function(a,b,c){throw H.a(P.C("Not supported"))},
$asaj:function(){return[P.i,null]},
$isJ:1,
$asJ:function(){return[P.i,null]},
"%":"RTCStatsReport"},
j5:{"^":"n:7;a",
$2:function(a,b){return C.a.h(this.a,a)}},
ov:{"^":"ac;0a1:type}","%":"HTMLScriptElement"},
ox:{"^":"ac;0l:length=","%":"HTMLSelectElement"},
da:{"^":"a7;","%":"AbsoluteOrientationSensor|AmbientLightSensor|OrientationSensor|RelativeOrientationSensor;Sensor"},
be:{"^":"a7;",$isbe:1,"%":"SourceBuffer"},
oy:{"^":"fs;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbe")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.be]},
$asx:function(){return[W.be]},
$isk:1,
$ask:function(){return[W.be]},
$isc:1,
$asc:function(){return[W.be]},
$asB:function(){return[W.be]},
"%":"SourceBufferList"},
oz:{"^":"ac;0a1:type}","%":"HTMLSourceElement"},
bf:{"^":"r;",$isbf:1,"%":"SpeechGrammar"},
oA:{"^":"li;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbf")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bf]},
$asx:function(){return[W.bf]},
$isk:1,
$ask:function(){return[W.bf]},
$isc:1,
$asc:function(){return[W.bf]},
$asB:function(){return[W.bf]},
"%":"SpeechGrammarList"},
bg:{"^":"r;0l:length=",$isbg:1,"%":"SpeechRecognitionResult"},
oC:{"^":"ll;",
k:function(a,b){return a.getItem(H.M(b))},
m:function(a,b,c){a.setItem(b,H.M(c))},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[P.i,P.i]})
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gao:function(a){var z=H.e([],[P.i])
this.L(a,new W.jm(z))
return z},
gl:function(a){return a.length},
$asaj:function(){return[P.i,P.i]},
$isJ:1,
$asJ:function(){return[P.i,P.i]},
"%":"Storage"},
jm:{"^":"n:17;a",
$2:function(a,b){return C.a.h(this.a,a)}},
oF:{"^":"ac;0a1:type}","%":"HTMLStyleElement"},
bh:{"^":"r;",$isbh:1,"%":"CSSStyleSheet|StyleSheet"},
dd:{"^":"ac;",$isdd:1,"%":"HTMLTableCellElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement"},
bi:{"^":"a7;",$isbi:1,"%":"TextTrack"},
bj:{"^":"a7;",$isbj:1,"%":"TextTrackCue|VTTCue"},
oK:{"^":"ls;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbj")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bj]},
$asx:function(){return[W.bj]},
$isk:1,
$ask:function(){return[W.bj]},
$isc:1,
$asc:function(){return[W.bj]},
$asB:function(){return[W.bj]},
"%":"TextTrackCueList"},
oL:{"^":"fv;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbi")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bi]},
$asx:function(){return[W.bi]},
$isk:1,
$ask:function(){return[W.bi]},
$isc:1,
$asc:function(){return[W.bi]},
$asB:function(){return[W.bi]},
"%":"TextTrackList"},
oM:{"^":"r;0l:length=","%":"TimeRanges"},
bl:{"^":"r;",$isbl:1,"%":"Touch"},
bm:{"^":"dg;",$isbm:1,"%":"TouchEvent"},
oN:{"^":"ly;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbl")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bl]},
$asx:function(){return[W.bl]},
$isk:1,
$ask:function(){return[W.bl]},
$isc:1,
$asc:function(){return[W.bl]},
$asB:function(){return[W.bl]},
"%":"TouchList"},
oO:{"^":"r;0l:length=","%":"TrackDefaultList"},
dg:{"^":"ae;","%":"CompositionEvent|FocusEvent|TextEvent;UIEvent"},
oQ:{"^":"r;",
i:function(a){return String(a)},
"%":"URL"},
oS:{"^":"r;0q:x=","%":"VRStageBoundsPoint"},
oT:{"^":"a7;0l:length=","%":"VideoTrackList"},
bQ:{"^":"aD;",
ght:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.a(P.C("deltaY is not supported"))},
ghs:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.a(P.C("deltaX is not supported"))},
$isbQ:1,
"%":"WheelEvent"},
kp:{"^":"a7;",
fA:function(a,b){return a.requestAnimationFrame(H.bu(H.h(b,{func:1,ret:-1,args:[P.X]}),1))},
eR:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
"%":"DOMWindow|Window"},
oY:{"^":"m_;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isb5")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b5]},
$asx:function(){return[W.b5]},
$isk:1,
$ask:function(){return[W.b5]},
$isc:1,
$asc:function(){return[W.b5]},
$asB:function(){return[W.b5]},
"%":"CSSRuleList"},
oZ:{"^":"hD;",
i:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(a.width)+" x "+H.l(a.height)},
u:function(a,b){var z
if(b==null)return!1
z=H.bt(b,"$isa9",[P.X],"$asa9")
if(!z)return!1
z=J.aW(b)
return a.left===z.gaR(b)&&a.top===z.gbd(b)&&a.width===z.gar(b)&&a.height===z.gan(b)},
gU:function(a){return W.fl(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gan:function(a){return a.height},
gar:function(a){return a.width},
gq:function(a){return a.x},
gt:function(a){return a.y},
"%":"ClientRect|DOMRect"},
p0:{"^":"m1;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isb8")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b8]},
$asx:function(){return[W.b8]},
$isk:1,
$ask:function(){return[W.b8]},
$isc:1,
$asc:function(){return[W.b8]},
$asB:function(){return[W.b8]},
"%":"GamepadList"},
p1:{"^":"m3;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isK")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.K]},
$asx:function(){return[W.K]},
$isk:1,
$ask:function(){return[W.K]},
$isc:1,
$asc:function(){return[W.K]},
$asB:function(){return[W.K]},
"%":"MozNamedAttrMap|NamedNodeMap"},
p2:{"^":"m5;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbg")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bg]},
$asx:function(){return[W.bg]},
$isk:1,
$ask:function(){return[W.bg]},
$isc:1,
$asc:function(){return[W.bg]},
$asB:function(){return[W.bg]},
"%":"SpeechRecognitionResultList"},
p3:{"^":"m7;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.D(b)
H.f(c,"$isbh")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.d(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bh]},
$asx:function(){return[W.bh]},
$isk:1,
$ask:function(){return[W.bh]},
$isc:1,
$asc:function(){return[W.bh]},
$asB:function(){return[W.bh]},
"%":"StyleSheetList"},
kE:{"^":"dc;a,b,c,$ti",
hK:function(a,b,c,d){var z=H.y(this,0)
H.h(a,{func:1,ret:-1,args:[z]})
H.h(c,{func:1,ret:-1})
return W.a4(this.a,this.b,a,!1,z)}},
p_:{"^":"kE;a,b,c,$ti"},
kF:{"^":"eF;a,b,c,d,e,$ti",
fQ:function(){var z=this.d
if(z!=null&&this.a<=0)J.ha(this.b,this.c,z,!1)},
p:{
a4:function(a,b,c,d,e){var z=c==null?null:W.fL(new W.kG(c),W.ae)
z=new W.kF(0,a,b,z,!1,[e])
z.fQ()
return z}}},
kG:{"^":"n:4;a",
$1:function(a){return this.a.$1(H.f(a,"$isae"))}},
B:{"^":"b;$ti",
ga0:function(a){return new W.e8(a,this.gl(a),-1,[H.b_(this,a,"B",0)])},
az:function(a,b,c,d){H.z(d,H.b_(this,a,"B",0))
throw H.a(P.C("Cannot modify an immutable List."))}},
e8:{"^":"b;a,b,c,0d,$ti",
I:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.dH(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gT:function(a){return this.d}},
ky:{"^":"r+hx;"},
kA:{"^":"r+x;"},
kB:{"^":"kA+B;"},
kC:{"^":"r+x;"},
kD:{"^":"kC+B;"},
kH:{"^":"r+x;"},
kI:{"^":"kH+B;"},
kU:{"^":"r+x;"},
kV:{"^":"kU+B;"},
l0:{"^":"r+aj;"},
l1:{"^":"r+aj;"},
l2:{"^":"r+x;"},
l3:{"^":"l2+B;"},
l4:{"^":"r+x;"},
l5:{"^":"l4+B;"},
l8:{"^":"r+x;"},
l9:{"^":"l8+B;"},
lf:{"^":"r+aj;"},
fr:{"^":"a7+x;"},
fs:{"^":"fr+B;"},
lh:{"^":"r+x;"},
li:{"^":"lh+B;"},
ll:{"^":"r+aj;"},
lr:{"^":"r+x;"},
ls:{"^":"lr+B;"},
fu:{"^":"a7+x;"},
fv:{"^":"fu+B;"},
lx:{"^":"r+x;"},
ly:{"^":"lx+B;"},
lZ:{"^":"r+x;"},
m_:{"^":"lZ+B;"},
m0:{"^":"r+x;"},
m1:{"^":"m0+B;"},
m2:{"^":"r+x;"},
m3:{"^":"m2+B;"},
m4:{"^":"r+x;"},
m5:{"^":"m4+B;"},
m6:{"^":"r+x;"},
m7:{"^":"m6+B;"}}],["","",,P,{"^":"",
aV:function(a){var z,y,x,w,v
if(a==null)return
z=P.ei(P.i,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w){v=H.M(y[w])
z.m(0,v,a[v])}return z},
mp:function(a,b){var z={}
a.L(0,new P.mq(z))
return z},
e4:function(){var z=$.e3
if(z==null){z=J.cK(window.navigator.userAgent,"Opera",0)
$.e3=z}return z},
hB:function(){var z,y
z=$.e0
if(z!=null)return z
y=$.e1
if(y==null){y=J.cK(window.navigator.userAgent,"Firefox",0)
$.e1=y}if(y)z="-moz-"
else{y=$.e2
if(y==null){y=!P.e4()&&J.cK(window.navigator.userAgent,"Trident/",0)
$.e2=y}if(y)z="-ms-"
else z=P.e4()?"-o-":"-webkit-"}$.e0=z
return z},
lo:{"^":"b;",
dM:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
C.a.h(z,a)
C.a.h(this.b,null)
return y},
cI:function(a){var z,y,x,w,v
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.O(a)
if(!!y.$isam)return new Date(a.a)
if(!!y.$isiZ)throw H.a(P.c7("structured clone of RegExp"))
if(!!y.$isaX)return a
if(!!y.$iscN)return a
if(!!y.$ise7)return a
if(!!y.$isea)return a
if(!!y.$iseq||!!y.$isd6)return a
if(!!y.$isJ){x=this.dM(a)
w=this.b
if(x>=w.length)return H.d(w,x)
v=w[x]
z.a=v
if(v!=null)return v
v={}
z.a=v
C.a.m(w,x,v)
y.L(a,new P.lq(z,this))
return z.a}if(!!y.$isc){x=this.dM(a)
z=this.b
if(x>=z.length)return H.d(z,x)
v=z[x]
if(v!=null)return v
return this.hq(a,x)}throw H.a(P.c7("structured clone of other type"))},
hq:function(a,b){var z,y,x,w
z=J.aH(a)
y=z.gl(a)
x=new Array(y)
C.a.m(this.b,b,x)
if(typeof y!=="number")return H.p(y)
w=0
for(;w<y;++w)C.a.m(x,w,this.cI(z.k(a,w)))
return x}},
lq:{"^":"n:6;a,b",
$2:function(a,b){this.a.a[a]=this.b.cI(b)}},
mq:{"^":"n:6;a",
$2:function(a,b){this.a[a]=b}},
lp:{"^":"lo;a,b"},
hN:{"^":"cp;a,b",
gbj:function(){var z,y,x
z=this.b
y=H.ay(z,"x",0)
x=W.a1
return new H.il(new H.kn(z,H.h(new P.hO(),{func:1,ret:P.ai,args:[y]}),[y]),H.h(new P.hP(),{func:1,ret:x,args:[y]}),[y,x])},
m:function(a,b,c){var z
H.D(b)
H.f(c,"$isa1")
z=this.gbj()
J.hd(z.b.$1(J.cL(z.a,b)),c)},
h:function(a,b){this.b.a.appendChild(b)},
az:function(a,b,c,d){throw H.a(P.C("Cannot fillRange on filtered list"))},
gl:function(a){return J.au(this.gbj().a)},
k:function(a,b){var z=this.gbj()
return z.b.$1(J.cL(z.a,b))},
ga0:function(a){var z=P.ie(this.gbj(),!1,W.a1)
return new J.az(z,z.length,0,[H.y(z,0)])},
$asx:function(){return[W.a1]},
$ask:function(){return[W.a1]},
$asc:function(){return[W.a1]}},
hO:{"^":"n:44;",
$1:function(a){return!!J.O(H.f(a,"$isK")).$isa1}},
hP:{"^":"n:27;",
$1:function(a){return H.j(H.f(a,"$isK"),"$isa1")}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
bS:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fk:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
bK:{"^":"b;q:a>,t:b>,$ti",
i:function(a){return"Point("+H.l(this.a)+", "+H.l(this.b)+")"},
u:function(a,b){var z,y,x
if(b==null)return!1
z=H.bt(b,"$isbK",[P.X],null)
if(!z)return!1
z=this.a
y=J.aW(b)
x=y.gq(b)
if(z==null?x==null:z===x){z=this.b
y=y.gt(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gU:function(a){var z,y
z=J.b2(this.a)
y=J.b2(this.b)
return P.fk(P.bS(P.bS(0,z),y))},
j:function(a,b){var z,y,x
z=this.a
if(typeof z!=="number")return z.j()
y=H.y(this,0)
z=H.z(z*b,y)
x=this.b
if(typeof x!=="number")return x.j()
return new P.bK(z,H.z(x*b,y),this.$ti)}},
la:{"^":"b;$ti",
gb9:function(a){var z=this.a
if(typeof z!=="number")return z.D()
return H.z(z+this.c,H.y(this,0))},
gca:function(a){var z=this.b
if(typeof z!=="number")return z.D()
return H.z(z+this.d,H.y(this,0))},
i:function(a){return"Rectangle ("+H.l(this.a)+", "+H.l(this.b)+") "+this.c+" x "+this.d},
u:function(a,b){var z,y,x,w
if(b==null)return!1
z=H.bt(b,"$isa9",[P.X],"$asa9")
if(!z)return!1
z=this.a
y=J.aW(b)
x=y.gaR(b)
if(z==null?x==null:z===x){x=this.b
w=y.gbd(b)
if(x==null?w==null:x===w){if(typeof z!=="number")return z.D()
w=H.y(this,0)
if(H.z(z+this.c,w)===y.gb9(b)){if(typeof x!=="number")return x.D()
z=H.z(x+this.d,w)===y.gca(b)}else z=!1}else z=!1}else z=!1
return z},
gU:function(a){var z,y,x,w,v
z=this.a
y=J.b2(z)
x=this.b
w=J.b2(x)
if(typeof z!=="number")return z.D()
v=H.y(this,0)
z=H.z(z+this.c,v)
if(typeof x!=="number")return x.D()
v=H.z(x+this.d,v)
return P.fk(P.bS(P.bS(P.bS(P.bS(0,y),w),z&0x1FFFFFFF),v&0x1FFFFFFF))},
dm:function(a,b){var z,y
H.w(b,"$isbK",[P.X],"$asbK")
z=b.a
y=this.a
if(typeof z!=="number")return z.cL()
if(typeof y!=="number")return H.p(y)
if(z>=y)if(z<=y+this.c){z=b.b
y=this.b
if(typeof z!=="number")return z.cL()
if(typeof y!=="number")return H.p(y)
z=z>=y&&z<=y+this.d}else z=!1
else z=!1
return z}},
a9:{"^":"la;aR:a>,bd:b>,ar:c>,an:d>,$ti",p:{
iW:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.O()
if(c<0)z=-c*0
else z=c
H.z(z,e)
if(typeof d!=="number")return d.O()
if(d<0)y=-d*0
else y=d
return new P.a9(a,b,z,H.z(y,e),[e])}}}}],["","",,P,{"^":"",nA:{"^":"U;0q:x=,0t:y=","%":"SVGFEBlendElement"},nB:{"^":"U;0q:x=,0t:y=","%":"SVGFEColorMatrixElement"},nC:{"^":"U;0q:x=,0t:y=","%":"SVGFEComponentTransferElement"},nD:{"^":"U;0q:x=,0t:y=","%":"SVGFECompositeElement"},nE:{"^":"U;0q:x=,0t:y=","%":"SVGFEConvolveMatrixElement"},nF:{"^":"U;0q:x=,0t:y=","%":"SVGFEDiffuseLightingElement"},nG:{"^":"U;0q:x=,0t:y=","%":"SVGFEDisplacementMapElement"},nH:{"^":"U;0q:x=,0t:y=","%":"SVGFEFloodElement"},nI:{"^":"U;0q:x=,0t:y=","%":"SVGFEGaussianBlurElement"},nJ:{"^":"U;0q:x=,0t:y=","%":"SVGFEImageElement"},nK:{"^":"U;0q:x=,0t:y=","%":"SVGFEMergeElement"},nL:{"^":"U;0q:x=,0t:y=","%":"SVGFEMorphologyElement"},nM:{"^":"U;0q:x=,0t:y=","%":"SVGFEOffsetElement"},nN:{"^":"U;0q:x=,0t:y=","%":"SVGFEPointLightElement"},nO:{"^":"U;0q:x=,0t:y=","%":"SVGFESpecularLightingElement"},nP:{"^":"U;0q:x=,0t:y=","%":"SVGFESpotLightElement"},nQ:{"^":"U;0q:x=,0t:y=","%":"SVGFETileElement"},nR:{"^":"U;0q:x=,0t:y=","%":"SVGFETurbulenceElement"},nT:{"^":"U;0q:x=,0t:y=","%":"SVGFilterElement"},nU:{"^":"bD;0q:x=,0t:y=","%":"SVGForeignObjectElement"},hS:{"^":"bD;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bD:{"^":"U;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},nZ:{"^":"bD;0q:x=,0t:y=","%":"SVGImageElement"},bG:{"^":"r;",$isbG:1,"%":"SVGLength"},o1:{"^":"kX;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.D(b)
H.f(c,"$isbG")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asx:function(){return[P.bG]},
$isk:1,
$ask:function(){return[P.bG]},
$isc:1,
$asc:function(){return[P.bG]},
$asB:function(){return[P.bG]},
"%":"SVGLengthList"},o5:{"^":"U;0q:x=,0t:y=","%":"SVGMaskElement"},bJ:{"^":"r;",$isbJ:1,"%":"SVGNumber"},oh:{"^":"l7;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.D(b)
H.f(c,"$isbJ")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asx:function(){return[P.bJ]},
$isk:1,
$ask:function(){return[P.bJ]},
$isc:1,
$asc:function(){return[P.bJ]},
$asB:function(){return[P.bJ]},
"%":"SVGNumberList"},om:{"^":"U;0q:x=,0t:y=","%":"SVGPatternElement"},oo:{"^":"r;0q:x=,0t:y=","%":"SVGPoint"},op:{"^":"r;0l:length=","%":"SVGPointList"},oq:{"^":"r;0q:x=,0t:y=","%":"SVGRect"},or:{"^":"hS;0q:x=,0t:y=","%":"SVGRectElement"},ow:{"^":"U;0a1:type}","%":"SVGScriptElement"},oD:{"^":"ln;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.D(b)
H.M(c)
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asx:function(){return[P.i]},
$isk:1,
$ask:function(){return[P.i]},
$isc:1,
$asc:function(){return[P.i]},
$asB:function(){return[P.i]},
"%":"SVGStringList"},oG:{"^":"U;0a1:type}","%":"SVGStyleElement"},U:{"^":"a1;",
gce:function(a){return new P.hN(a,new W.kw(a))},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGSetElement|SVGStopElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},oH:{"^":"bD;0q:x=,0t:y=","%":"SVGSVGElement"},jr:{"^":"bD;","%":"SVGTextPathElement;SVGTextContentElement"},oJ:{"^":"jr;0q:x=,0t:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},bN:{"^":"r;",$isbN:1,"%":"SVGTransform"},oP:{"^":"lA;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.D(b)
H.f(c,"$isbN")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asx:function(){return[P.bN]},
$isk:1,
$ask:function(){return[P.bN]},
$isc:1,
$asc:function(){return[P.bN]},
$asB:function(){return[P.bN]},
"%":"SVGTransformList"},oR:{"^":"bD;0q:x=,0t:y=","%":"SVGUseElement"},kW:{"^":"r+x;"},kX:{"^":"kW+B;"},l6:{"^":"r+x;"},l7:{"^":"l6+B;"},lm:{"^":"r+x;"},ln:{"^":"lm+B;"},lz:{"^":"r+x;"},lA:{"^":"lz+B;"}}],["","",,P,{"^":"",R:{"^":"b;",$isk:1,
$ask:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]}}}],["","",,P,{"^":"",nb:{"^":"r;0l:length=","%":"AudioBuffer"},dM:{"^":"a7;","%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioWorkletNode|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|IIRFilterNode|JavaScriptAudioNode|MediaElementAudioSourceNode|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|StereoPannerNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},nc:{"^":"kv;",
k:function(a,b){return P.aV(a.get(H.M(b)))},
L:function(a,b){var z,y
H.h(b,{func:1,ret:-1,args:[P.i,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aV(y.value[1]))}},
gao:function(a){var z=H.e([],[P.i])
this.L(a,new P.hh(z))
return z},
gl:function(a){return a.size},
m:function(a,b,c){throw H.a(P.C("Not supported"))},
$asaj:function(){return[P.i,null]},
$isJ:1,
$asJ:function(){return[P.i,null]},
"%":"AudioParamMap"},hh:{"^":"n:7;a",
$2:function(a,b){return C.a.h(this.a,a)}},hi:{"^":"dM;","%":"AudioBufferSourceNode|ConstantSourceNode;AudioScheduledSourceNode"},nd:{"^":"a7;0l:length=","%":"AudioTrackList"},hl:{"^":"a7;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},ne:{"^":"dM;0a1:type}","%":"BiquadFilterNode"},ok:{"^":"hl;0l:length=","%":"OfflineAudioContext"},ol:{"^":"hi;0a1:type}","%":"Oscillator|OscillatorNode"},kv:{"^":"r+aj;"}}],["","",,P,{"^":"",ez:{"^":"r;",$isez:1,"%":"WebGLRenderingContext"},jN:{"^":"r;",$isjN:1,"%":"WebGLUniformLocation"}}],["","",,P,{"^":"",oB:{"^":"lk;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.S(b,a,null,null,null))
return P.aV(a.item(b))},
m:function(a,b,c){H.D(b)
H.f(c,"$isJ")
throw H.a(P.C("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asx:function(){return[[P.J,,,]]},
$isk:1,
$ask:function(){return[[P.J,,,]]},
$isc:1,
$asc:function(){return[[P.J,,,]]},
$asB:function(){return[[P.J,,,]]},
"%":"SQLResultSetRowList"},lj:{"^":"r+x;"},lk:{"^":"lj+B;"}}],["","",,O,{"^":"",aJ:{"^":"b;0a,0b,0c,0d,$ti",
bM:function(a){this.a=H.e([],[a])
this.b=null
this.c=null
this.d=null},
cO:function(a,b,c){var z=H.ay(this,"aJ",0)
H.h(b,{func:1,ret:P.ai,args:[[P.k,z]]})
z={func:1,ret:-1,args:[P.m,[P.k,z]]}
H.h(a,z)
H.h(c,z)
this.b=b
this.c=a
this.d=c},
bh:function(a,b){return this.cO(a,null,b)},
fm:function(a){var z
H.w(a,"$isk",[H.ay(this,"aJ",0)],"$ask")
z=this.b
if(z!=null)return z.$1(a)
return!0},
ey:function(a,b){var z
H.w(b,"$isk",[H.ay(this,"aJ",0)],"$ask")
z=this.c
if(z!=null)z.$2(a,b)},
gl:function(a){return this.a.length},
ga0:function(a){var z=this.a
return new J.az(z,z.length,0,[H.y(z,0)])},
J:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
h:function(a,b){var z,y,x
z=H.ay(this,"aJ",0)
H.z(b,z)
z=[z]
if(this.fm(H.e([b],z))){y=this.a
x=y.length
C.a.h(y,b)
this.ey(x,H.e([b],z))}},
$isk:1,
p:{
cR:function(a){var z=new O.aJ([a])
z.bM(a)
return z}}},d3:{"^":"b;0a,0b",
gl:function(a){return this.a.length},
gB:function(){var z=this.b
if(z==null){z=D.Q()
this.b=z}return z},
ez:function(a){var z=this.b
if(!(z==null))z.G(a)},
aC:function(){return this.ez(null)},
gY:function(a){var z=this.a
if(z.length>0)return C.a.gaA(z)
else return V.c5()},
e5:function(a){var z=this.a
if(a==null)C.a.h(z,V.c5())
else C.a.h(z,a)
this.aC()},
cA:function(){var z=this.a
if(z.length>0){z.pop()
this.aC()}}}}],["","",,E,{"^":"",cM:{"^":"b;"},aK:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0a2:z@,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx",
sad:function(a,b){var z,y,x,w
z=this.c
if(z==null?b!=null:z!==b){this.c=b
this.d=b
this.e=null
if(z!=null){y=z.gB()
y.toString
x=H.h(this.ge1(),{func:1,ret:-1,args:[D.u]})
C.a.S(y.a,x)}y=this.c
if(y!=null){y=y.gB()
y.toString
x=H.h(this.ge1(),{func:1,ret:-1,args:[D.u]})
C.a.h(y.a,x)}w=new D.H("shape",z,this.c,this,[F.eC])
w.b=!0
this.ai(w)}},
sb5:function(a){var z,y,x,w
if(!J.P(this.r,a)){z=this.r
if(z!=null){y=z.gB()
y.toString
x=H.h(this.ge0(),{func:1,ret:-1,args:[D.u]})
C.a.S(y.a,x)}if(a!=null){y=a.gB()
y.toString
x=H.h(this.ge0(),{func:1,ret:-1,args:[D.u]})
C.a.h(y.a,x)}this.r=a
w=new D.H("mover",z,a,this,[U.a8])
w.b=!0
this.ai(w)}},
ap:function(a,b){var z,y,x,w
z=this.r
y=z!=null?z.a:null
if(!J.P(y,this.x)){x=this.x
this.x=y
w=new D.H("matrix",x,y,this,[V.av])
w.b=!0
this.ai(w)}for(z=this.y.a,z=new J.az(z,z.length,0,[H.y(z,0)]);z.I();)z.d.ap(0,b)},
aS:function(a){var z,y,x
z=a.dx
y=this.x
z.toString
if(y==null)C.a.h(z.a,z.gY(z))
else C.a.h(z.a,y.j(0,z.gY(z)))
z.aC()
a.e6(this.f)
z=a.dy
x=(z&&C.a).gaA(z)
if(x!=null&&this.d!=null)x.i5(a,this)
for(z=this.y.a,z=new J.az(z,z.length,0,[H.y(z,0)]);z.I();)z.d.aS(a)
a.e4()
a.dx.cA()},
gB:function(){var z=this.z
if(z==null){z=D.Q()
this.z=z}return z},
ai:function(a){var z=this.z
if(!(z==null))z.G(a)},
Z:function(){return this.ai(null)},
hT:[function(a){H.f(a,"$isu")
this.e=null
this.ai(a)},function(){return this.hT(null)},"j1","$1","$0","ge1",0,2,1],
hS:[function(a){this.ai(H.f(a,"$isu"))},function(){return this.hS(null)},"j0","$1","$0","ge0",0,2,1],
hQ:[function(a){this.ai(H.f(a,"$isu"))},function(){return this.hQ(null)},"iZ","$1","$0","ge_",0,2,1],
iY:[function(a,b){var z,y,x,w,v,u,t
H.w(b,"$isk",[E.aK],"$ask")
for(z=b.length,y=this.ge_(),x={func:1,ret:-1,args:[D.u]},w=[x],v=0;v<b.length;b.length===z||(0,H.A)(b),++v){u=b[v]
if(u!=null){if(u.ga2()==null){t=new D.b7()
t.a=H.e([],w)
t.c=0
u.sa2(t)}t=u.ga2()
t.toString
H.h(y,x)
C.a.h(t.a,y)}}this.Z()},"$2","ghP",8,0,8],
j_:[function(a,b){var z,y,x,w,v,u,t
H.w(b,"$isk",[E.aK],"$ask")
for(z=b.length,y=this.ge_(),x={func:1,ret:-1,args:[D.u]},w=[x],v=0;v<b.length;b.length===z||(0,H.A)(b),++v){u=b[v]
if(u!=null){if(u.ga2()==null){t=new D.b7()
t.a=H.e([],w)
t.c=0
u.sa2(t)}t=u.ga2()
t.toString
H.h(y,x)
C.a.S(t.a,y)}}this.Z()},"$2","ghR",8,0,8],
$isaL:1,
p:{
e6:function(a,b,c,d,e,f){var z,y
z=new E.aK()
z.a=d
z.b=!0
y=O.cR(E.aK)
z.y=y
y.bh(z.ghP(),z.ghR())
z.z=null
z.Q=null
z.ch=null
z.cx=null
z.cy=null
z.db=null
z.dx=null
z.dy=null
z.fr=null
z.fx=null
z.sad(0,e)
z.sb5(c)
return z}}},j0:{"^":"b;a,b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr",
eu:function(a,b){var z,y,x,w,v
this.c=512
this.d=512
this.e=0
z=new P.am(Date.now(),!1)
this.f=z
this.r=z
this.x=z
this.y=0
this.z=null
this.Q=null
this.ch=null
this.cx=null
z=new O.d3()
y=[V.av]
z.a=H.e([],y)
x=z.gB()
x.toString
w={func:1,ret:-1,args:[D.u]}
v=H.h(new E.j2(this),w)
C.a.h(x.a,v)
this.cy=z
z=new O.d3()
z.a=H.e([],y)
v=z.gB()
v.toString
x=H.h(new E.j3(this),w)
C.a.h(v.a,x)
this.db=z
z=new O.d3()
z.a=H.e([],y)
y=z.gB()
y.toString
w=H.h(new E.j4(this),w)
C.a.h(y.a,w)
this.dx=z
z=H.e([],[O.de])
this.dy=z
C.a.h(z,null)
this.fr=new H.aY(0,0,[P.i,A.eB])},
gi1:function(){var z,y
z=this.z
if(z==null){z=this.cy
z=z.gY(z)
y=this.db
y=z.j(0,y.gY(y))
this.z=y
z=y}return z},
e6:function(a){var z,y
z=this.dy
y=a==null?(z&&C.a).gaA(z):a;(z&&C.a).h(z,y)},
e4:function(){var z=this.dy
if(z.length>1)z.pop()},
p:{
j1:function(a,b){var z=new E.j0(a,b)
z.eu(a,b)
return z}}},j2:{"^":"n:12;a",
$1:function(a){var z
H.f(a,"$isu")
z=this.a
z.z=null
z.ch=null}},j3:{"^":"n:12;a",
$1:function(a){var z
H.f(a,"$isu")
z=this.a
z.z=null
z.Q=null
z.ch=null
z.cx=null}},j4:{"^":"n:12;a",
$1:function(a){var z
H.f(a,"$isu")
z=this.a
z.ch=null
z.cx=null}},jw:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0a2:x@,0y,0z,0Q,0ch",
gB:function(){var z=this.x
if(z==null){z=D.Q()
this.x=z}return z},
eB:[function(a){var z
H.f(a,"$isu")
z=this.x
if(!(z==null))z.G(a)
this.i7()},function(){return this.eB(null)},"eA","$1","$0","gcR",0,2,1],
ghB:function(){var z,y,x
z=Date.now()
y=C.d.a3(P.e5(0,0,0,z-this.Q.a,0,0).a,1000)/1000
if(y<=0)return 0
x=this.ch
this.ch=0
this.Q=new P.am(z,!1)
return x/y},
d9:function(){var z,y,x,w
z=window.devicePixelRatio
y=this.b.clientWidth
if(typeof y!=="number")return y.j()
if(typeof z!=="number")return H.p(z)
x=C.h.dN(y*z)
y=this.b.clientHeight
if(typeof y!=="number")return y.j()
w=C.h.dN(y*z)
y=this.b
if(y.width!==x||y.height!==w){y.width=x
y.height=w}},
i7:function(){var z,y
if(!this.z){this.z=!0
z=window
y=H.h(new E.jy(this),{func:1,ret:-1,args:[P.X]})
C.B.eR(z)
C.B.fA(z,W.fL(y,P.X))}},
i4:function(){var z,y,x,w,v
try{++this.ch
this.z=!1
this.d9()
if(this.d!=null){x=this.e;++x.e
x.r=x.x
w=Date.now()
x.x=new P.am(w,!1)
x.y=P.e5(0,0,0,w-x.r.a,0,0).a*0.000001
w=x.cy
C.a.sl(w.a,0)
w.aC()
w=x.db
C.a.sl(w.a,0)
w.aC()
w=x.dx
C.a.sl(w.a,0)
w.aC()
w=x.dy;(w&&C.a).sl(w,0)
x=x.dy;(x&&C.a).h(x,null)
this.d.aS(this.e)}}catch(v){z=H.at(v)
y=H.bw(v)
P.dE("Error: "+H.l(z))
P.dE("Stack: "+H.l(y))
throw H.a(z)}},
p:{
jx:function(a,b,c,d,e){var z,y,x,w
z=J.O(a)
if(!!z.$iscQ)return E.eK(a,!0,!0,!0,!1)
y=W.dU(null,null)
x=y.style
x.width="100%"
x.height="100%"
z.gce(a).h(0,y)
w=E.eK(y,!0,!0,!0,!1)
w.a=a
return w},
eK:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
z=new E.jw()
y=P.i9(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1],P.i,null)
x=C.l.cM(a,"webgl",y)
x=H.f(x==null?C.l.cM(a,"experimental-webgl",y):x,"$isez")
if(x==null)H.t(P.v("Failed to get the rendering context for WebGL."))
z.b=a
z.a=a
z.c=x
z.e=E.j1(x,a)
w=new T.js(x)
w.b=H.D(x.getParameter(3379))
w.c=H.D(x.getParameter(34076))
w.d=0
w.e=0
z.f=w
w=new X.k_(a)
v=new X.i2()
v.c=new X.aC(!1,!1,!1)
v.d=P.ic(null,null,null,P.m)
w.b=v
v=new X.iz(w)
v.f=0
v.r=new V.V(0,0)
v.x=new V.V(0,0)
v.Q=1
v.ch=1
w.c=v
v=new X.ih(w)
v.r=0
v.x=new V.V(0,0)
v.Q=1
v.ch=1
v.cx=1
v.cy=1
w.d=v
v=new X.jC(w)
v.e=0
v.f=new V.V(0,0)
v.r=new V.V(0,0)
w.e=v
w.f=!1
w.r=!1
w.x=!1
v=H.e([],[[P.eF,P.b]])
w.z=v
u=document
t=W.aD
s={func:1,ret:-1,args:[t]}
C.a.h(v,W.a4(u,"contextmenu",H.h(w.gf9(),s),!1,t))
v=w.z
r=W.ae
q={func:1,ret:-1,args:[r]};(v&&C.a).h(v,W.a4(a,"focus",H.h(w.gfc(),q),!1,r))
v=w.z;(v&&C.a).h(v,W.a4(a,"blur",H.h(w.gf5(),q),!1,r))
v=w.z
p=W.bF
o={func:1,ret:-1,args:[p]};(v&&C.a).h(v,W.a4(u,"keyup",H.h(w.gfe(),o),!1,p))
v=w.z;(v&&C.a).h(v,W.a4(u,"keydown",H.h(w.gfd(),o),!1,p))
p=w.z;(p&&C.a).h(p,W.a4(a,"mousedown",H.h(w.gfh(),s),!1,t))
p=w.z;(p&&C.a).h(p,W.a4(a,"mouseup",H.h(w.gfj(),s),!1,t))
p=w.z;(p&&C.a).h(p,W.a4(a,"mousemove",H.h(w.gfi(),s),!1,t))
p=w.z
o=W.bQ;(p&&C.a).h(p,W.a4(a,H.M(W.hH(a)),H.h(w.gfk(),{func:1,ret:-1,args:[o]}),!1,o))
o=w.z;(o&&C.a).h(o,W.a4(u,"mousemove",H.h(w.gfa(),s),!1,t))
o=w.z;(o&&C.a).h(o,W.a4(u,"mouseup",H.h(w.gfb(),s),!1,t))
t=w.z;(t&&C.a).h(t,W.a4(u,"pointerlockchange",H.h(w.gfl(),q),!1,r))
r=w.z
q=W.bm
u={func:1,ret:-1,args:[q]};(r&&C.a).h(r,W.a4(a,"touchstart",H.h(w.gft(),u),!1,q))
r=w.z;(r&&C.a).h(r,W.a4(a,"touchend",H.h(w.gfq(),u),!1,q))
r=w.z;(r&&C.a).h(r,W.a4(a,"touchmove",H.h(w.gfs(),u),!1,q))
z.r=w
z.y=!0
z.z=!1
z.Q=new P.am(Date.now(),!1)
z.ch=0
z.d9()
return z}}},jy:{"^":"n:31;a",
$1:function(a){var z
H.mW(a)
z=this.a
if(z.z){z.z=!1
z.i4()}}}}],["","",,Z,{"^":"",ff:{"^":"b;a,b",p:{
dl:function(a,b,c){var z
H.w(c,"$isc",[P.m],"$asc")
z=a.createBuffer()
a.bindBuffer(b,z)
a.bufferData(b,new Int16Array(H.bq(c)),35044)
a.bindBuffer(b,null)
return new Z.ff(b,z)}}},dQ:{"^":"cM;a,b,c,d,e",
bn:function(a){var z,y,x
try{a.a.enableVertexAttribArray(this.e)
a.a.vertexAttribPointer(this.e,this.b,5126,!1,this.d,this.c)}catch(y){z=H.at(y)
x=P.v('Failed to bind buffer attribute "'+J.ab(this.a)+'": '+H.l(z))
throw H.a(x)}},
i:function(a){return"["+J.ab(this.a)+", Size: "+this.b+", Offset: "+this.c+", Stride: "+this.d+", Attr: "+H.l(this.e)+"]"}},km:{"^":"b;a",$isnf:1},dR:{"^":"b;a,0b,c,d",
aQ:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<y;++x){w=z[x]
if((w.a.a&a.a)!==0)return w}return},
bn:function(a){var z,y
z=this.a
a.a.bindBuffer(z.a,z.b)
for(z=this.c,y=z.length-1;y>=0;--y)z[y].bn(a)},
ee:function(a){var z,y,x
for(z=this.c,y=z.length-1;y>=0;--y){x=z[y]
a.a.disableVertexAttribArray(x.e)}a.a.bindBuffer(this.a.a,null)},
aS:function(a){var z,y,x,w,v
z=this.b.length
for(y=0;y<z;++y){x=this.b
if(y>=x.length)return H.d(x,y)
w=x[y]
x=w.c
v=x.a
a.a.bindBuffer(v,x.b)
a.a.drawElements(w.a,w.b,5123,0)
a.a.bindBuffer(v,null)}},
i:function(a){var z,y,x,w,v,u
z=[P.i]
y=H.e([],z)
for(x=this.b,w=x.length,v=0;v<x.length;x.length===w||(0,H.A)(x),++v)C.a.h(y,x[v].i(0))
u=H.e([],z)
for(z=this.c,x=z.length,v=0;v<x;++v)C.a.h(u,J.ab(z[v]))
return"Buffer:  ["+this.a.i(0)+"]\nIndices: "+C.a.E(y,", ")+"\nAttrs:   "+C.a.E(u,", ")},
$isoI:1},cm:{"^":"b;a,b,c",
i:function(a){return"Type: "+this.a+", Count: "+this.b+", ["+("Instance of '"+H.bd(this.c)+"'")+"]"}},bn:{"^":"b;a",
gcP:function(a){var z,y
z=this.a
y=(z&$.$get$aR().a)!==0?3:0
if((z&$.$get$aQ().a)!==0)y+=3
if((z&$.$get$aP().a)!==0)y+=3
if((z&$.$get$aS().a)!==0)y+=2
if((z&$.$get$aT().a)!==0)y+=3
if((z&$.$get$bO().a)!==0)y+=3
if((z&$.$get$bP().a)!==0)y+=4
if((z&$.$get$bo().a)!==0)++y
return(z&$.$get$aO().a)!==0?y+4:y},
hj:function(a){var z,y,x
z=$.$get$aR()
y=this.a
if((y&z.a)!==0){if(0===a)return z
x=1}else x=0
z=$.$get$aQ()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aP()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aS()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aT()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$bO()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$bP()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$bo()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aO()
if((y&z.a)!==0)if(x===a)return z
return $.$get$fe()},
u:function(a,b){if(b==null)return!1
if(!(b instanceof Z.bn))return!1
return this.a===b.a},
i:function(a){var z,y
z=H.e([],[P.i])
y=this.a
if((y&$.$get$aR().a)!==0)C.a.h(z,"Pos")
if((y&$.$get$aQ().a)!==0)C.a.h(z,"Norm")
if((y&$.$get$aP().a)!==0)C.a.h(z,"Binm")
if((y&$.$get$aS().a)!==0)C.a.h(z,"Txt2D")
if((y&$.$get$aT().a)!==0)C.a.h(z,"TxtCube")
if((y&$.$get$bO().a)!==0)C.a.h(z,"Clr3")
if((y&$.$get$bP().a)!==0)C.a.h(z,"Clr4")
if((y&$.$get$bo().a)!==0)C.a.h(z,"Weight")
if((y&$.$get$aO().a)!==0)C.a.h(z,"Bending")
if(z.length<=0)return"None"
return C.a.E(z,"|")},
p:{
ar:function(a){return new Z.bn(a)}}}}],["","",,D,{"^":"",dV:{"^":"b;"},b7:{"^":"b;0a,0b,0c",
G:function(a){var z,y,x,w
z={}
z.a=a
y=this.a
x=y.length
if(a==null){a=new D.u(null)
a.b=!0
z.a=a
w=a}else w=a
if(this.c>0){if(this.b==null)this.b=w}else C.a.L(y,new D.hL(z))
return x!==0},
i8:function(a,b,c){var z,y
z=this.c
if(z>0){--z
this.c=z
if(z<=0)z=this.b!=null
else z=!1
if(z){y=this.b
this.b=null
this.G(y)}}},
aa:function(a){return this.i8(a,!0,!1)},
p:{
Q:function(){var z=new D.b7()
z.a=H.e([],[{func:1,ret:-1,args:[D.u]}])
z.c=0
return z}}},hL:{"^":"n:32;a",
$1:function(a){var z
H.h(a,{func:1,ret:-1,args:[D.u]})
z=this.a.a
z.b
a.$1(z)}},u:{"^":"b;a,0b"},cn:{"^":"u;c,d,a,0b,$ti"},co:{"^":"u;c,d,a,0b,$ti"},H:{"^":"u;c,d,e,a,0b,$ti",
i:function(a){return"ValueChanged: "+this.c+", "+H.l(this.d)+" => "+H.l(this.e)}}}],["","",,X,{"^":"",dS:{"^":"b;a,b",
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof X.dS))return!1
z=this.a
y=b.a
if(z==null?y!=null:z!==y)return!1
if(!this.b.u(0,b.b))return!1
return!0},
i:function(a){return this.b.i(0)+H.l(this.a)},
p:{"^":"nh<"}},ef:{"^":"b;a,b",
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof X.ef))return!1
z=this.a
y=b.a
if(z==null?y!=null:z!==y)return!1
if(!this.b.u(0,b.b))return!1
return!0},
i:function(a){return this.b.i(0)+H.l(this.a)}},eg:{"^":"u;c,a,0b"},i2:{"^":"b;0a,0b,0c,0d",
hZ:function(a){var z,y
this.c=a.b
this.d.h(0,a.a)
z=this.a
if(z==null)return!1
y=new X.eg(a,this)
y.b=!0
return z.G(y)},
hV:function(a){var z,y
this.c=a.b
this.d.S(0,a.a)
z=this.b
if(z==null)return!1
y=new X.eg(a,this)
y.b=!0
return z.G(y)}},ek:{"^":"cr;x,y,c,d,e,a,0b"},ih:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy",
au:function(a,b){var z,y,x,w,v,u,t,s
z=new P.am(Date.now(),!1)
y=this.x
x=b.a
w=this.Q
if(typeof x!=="number")return x.j()
v=b.b
u=this.ch
if(typeof v!=="number")return v.j()
t=new V.V(y.a+x*w,y.b+v*u)
u=this.a.gaK()
s=new X.bH(a,new V.V(0,0),this.x,this.y,this.z,u,t,z,this)
s.b=!0
this.z=z
this.x=t
return s},
cz:function(a,b){var z
this.r=a.a
z=this.b
if(z==null)return!1
z.G(this.au(a,b))
return!0},
b7:function(a,b){var z,y
z=this.r
y=a.a
if(typeof y!=="number")return y.el()
if(typeof z!=="number")return z.bI()
this.r=(z&~y)>>>0
z=this.c
if(z==null)return!1
z.G(this.au(a,b))
return!0},
b6:function(a,b){var z=this.d
if(z==null)return!1
z.G(this.au(a,b))
return!0},
i_:function(a){var z,y,x,w,v,u,t,s
z=this.e
if(z==null)return!1
y=this.a.gaK()
x=this.x
w=Date.now()
v=a.a
u=this.cx
if(typeof v!=="number")return v.j()
t=a.b
s=this.cy
if(typeof t!=="number")return t.j()
w=new X.d4(new V.W(v*u,t*s),y,x,new P.am(w,!1),this)
w.b=!0
z.G(w)
return!0},
fg:function(a,b,c){var z,y,x
if(this.f==null)return
z=new P.am(Date.now(),!1)
y=this.f
x=new X.ek(c,a,this.a.gaK(),b,z,this)
x.b=!0
y.G(x)
this.y=z
this.x=new V.V(0,0)}},aC:{"^":"b;a,b,c",
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof X.aC))return!1
if(this.a!==b.a)return!1
z=this.b
y=b.b
if(z==null?y!=null:z!==y)return!1
z=this.c
y=b.c
if(z==null?y!=null:z!==y)return!1
return!0},
i:function(a){var z=this.a?"Ctrl+":""
z+=this.b?"Alt+":""
return z+(this.c?"Shift+":"")}},bH:{"^":"cr;x,y,z,Q,ch,c,d,e,a,0b"},iz:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch",
bS:function(a,b,c){var z,y,x
z=new P.am(Date.now(),!1)
y=this.a.gaK()
x=new X.bH(a,this.r,this.x,this.y,this.z,y,b,z,this)
x.b=!0
if(c){this.y=z
this.r=b}this.z=z
this.x=b
return x},
cz:function(a,b){var z
this.f=a.a
z=this.b
if(z==null)return!1
z.G(this.bS(a,b,!0))
return!0},
b7:function(a,b){var z,y
z=this.f
y=a.a
if(typeof y!=="number")return y.el()
if(typeof z!=="number")return z.bI()
this.f=(z&~y)>>>0
z=this.c
if(z==null)return!1
z.G(this.bS(a,b,!0))
return!0},
b6:function(a,b){var z=this.d
if(z==null)return!1
z.G(this.bS(a,b,!1))
return!0},
i0:function(a,b){var z,y,x,w,v,u,t
z=this.e
if(z==null)return!1
y=this.a.gaK()
x=Date.now()
w=a.a
v=this.Q
if(typeof w!=="number")return w.j()
u=a.b
t=this.ch
if(typeof u!=="number")return u.j()
x=new X.d4(new V.W(w*v,u*t),y,b,new P.am(x,!1),this)
x.b=!0
z.G(x)
return!0},
gdn:function(){var z=this.b
if(z==null){z=D.Q()
this.b=z}return z},
gbH:function(){var z=this.c
if(z==null){z=D.Q()
this.c=z}return z},
gdY:function(){var z=this.d
if(z==null){z=D.Q()
this.d=z}return z}},d4:{"^":"cr;x,c,d,e,a,0b"},cr:{"^":"u;"},eO:{"^":"cr;x,y,z,Q,ch,c,d,e,a,0b"},jC:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y",
au:function(a,b){var z,y,x,w
H.w(a,"$isc",[V.V],"$asc")
z=new P.am(Date.now(),!1)
y=a.length>0?a[0]:new V.V(0,0)
x=this.a.gaK()
w=new X.eO(a,this.f,this.r,this.x,this.y,x,y,z,this)
w.b=!0
if(b){this.x=z
this.f=y}this.y=z
this.r=y
return w},
hY:function(a){var z
H.w(a,"$isc",[V.V],"$asc")
z=this.b
if(z==null)return!1
z.G(this.au(a,!0))
return!0},
hW:function(a){var z
H.w(a,"$isc",[V.V],"$asc")
z=this.c
if(z==null)return!1
z.G(this.au(a,!0))
return!0},
hX:function(a){var z
H.w(a,"$isc",[V.V],"$asc")
z=this.d
if(z==null)return!1
z.G(this.au(a,!1))
return!0}},k_:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z",
gaK:function(){var z=this.a
return V.ey(0,0,(z&&C.l).gbp(z).c,C.l.gbp(z).d)},
d0:function(a){var z,y
z=a.keyCode
y=a.ctrlKey||a.metaKey
return new X.ef(z,new X.aC(y,a.altKey,a.shiftKey))},
aI:function(a){var z,y
z=this.b
y=a.ctrlKey||a.metaKey
z.c=new X.aC(y,a.altKey,a.shiftKey)},
c4:function(a){var z,y
z=this.b
y=a.ctrlKey||a.metaKey
z.c=new X.aC(y,a.altKey,a.shiftKey)},
av:function(a){var z,y,x,w,v
z=this.a.getBoundingClientRect()
y=a.pageX
x=a.pageY
w=z.left
if(typeof y!=="number")return y.M()
v=z.top
if(typeof x!=="number")return x.M()
return new V.V(y-w,x-v)},
aV:function(a){return new V.W(a.movementX,a.movementY)},
bZ:function(a){var z,y,x,w,v,u,t,s
z=this.a.getBoundingClientRect()
y=H.e([],[V.V])
for(x=a.touches,w=x.length,v=0;v<x.length;x.length===w||(0,H.A)(x),++v){u=x[v]
t=C.h.ab(u.pageX)
C.h.ab(u.pageY)
s=z.left
C.h.ab(u.pageX)
C.a.h(y,new V.V(t-s,C.h.ab(u.pageY)-z.top))}return y},
as:function(a){var z,y
z=a.buttons
y=a.ctrlKey||a.metaKey
return new X.dS(z,new X.aC(y,a.altKey,a.shiftKey))},
iB:[function(a){this.f=!0},"$1","gfc",4,0,4],
iu:[function(a){this.f=!1},"$1","gf5",4,0,4],
iy:[function(a){if(this.f)a.preventDefault()},"$1","gf9",4,0,4],
iD:[function(a){var z
H.f(a,"$isbF")
if(!this.f)return
z=this.d0(a)
if(this.b.hZ(z))a.preventDefault()},"$1","gfe",4,0,19],
iC:[function(a){var z
H.f(a,"$isbF")
if(!this.f)return
z=this.d0(a)
if(this.b.hV(z))a.preventDefault()},"$1","gfd",4,0,19],
iF:[function(a){var z,y,x,w
H.f(a,"$isaD")
z=this.a
z.focus()
this.f=!0
this.aI(a)
if(this.x){y=this.as(a)
x=this.aV(a)
if(this.d.cz(y,x))a.preventDefault()
return}if(this.r){this.y=a
z.requestPointerLock()
return}y=this.as(a)
w=this.av(a)
if(this.c.cz(y,w))a.preventDefault()},"$1","gfh",4,0,5],
iH:[function(a){var z,y,x
H.f(a,"$isaD")
this.aI(a)
z=this.as(a)
if(this.x){y=this.aV(a)
if(this.d.b7(z,y))a.preventDefault()
return}if(this.r)return
x=this.av(a)
if(this.c.b7(z,x))a.preventDefault()},"$1","gfj",4,0,5],
iA:[function(a){var z,y,x,w
H.f(a,"$isaD")
z=this.a
if(!(z&&C.l).gbp(z).dm(0,new P.bK(a.clientX,a.clientY,[P.X]))){this.aI(a)
y=this.as(a)
if(this.x){x=this.aV(a)
if(this.d.b7(y,x))a.preventDefault()
return}if(this.r)return
w=this.av(a)
if(this.c.b7(y,w))a.preventDefault()}},"$1","gfb",4,0,5],
iG:[function(a){var z,y,x
H.f(a,"$isaD")
this.aI(a)
z=this.as(a)
if(this.x){y=this.aV(a)
if(this.d.b6(z,y))a.preventDefault()
return}if(this.r)return
x=this.av(a)
if(this.c.b6(z,x))a.preventDefault()},"$1","gfi",4,0,5],
iz:[function(a){var z,y,x,w
H.f(a,"$isaD")
z=this.a
if(!(z&&C.l).gbp(z).dm(0,new P.bK(a.clientX,a.clientY,[P.X]))){this.aI(a)
y=this.as(a)
if(this.x){x=this.aV(a)
if(this.d.b6(y,x))a.preventDefault()
return}if(this.r)return
w=this.av(a)
if(this.c.b6(y,w))a.preventDefault()}},"$1","gfa",4,0,5],
iI:[function(a){var z,y
H.f(a,"$isbQ")
this.aI(a)
z=new V.W((a&&C.A).ghs(a),C.A.ght(a)).w(0,180)
if(this.x){if(this.d.i_(z))a.preventDefault()
return}if(this.r)return
y=this.av(a)
if(this.c.i0(z,y))a.preventDefault()},"$1","gfk",4,0,35],
iJ:[function(a){var z,y,x,w,v
z=document.pointerLockElement
y=this.a
x=z==null?y==null:z===y
if(x!==this.x){this.x=x
w=this.as(this.y)
v=this.av(this.y)
this.d.fg(w,v,x)}},"$1","gfl",4,0,4],
iP:[function(a){var z
H.f(a,"$isbm")
this.a.focus()
this.f=!0
this.c4(a)
z=this.bZ(a)
if(this.e.hY(z))a.preventDefault()},"$1","gft",4,0,13],
iN:[function(a){var z
H.f(a,"$isbm")
this.c4(a)
z=this.bZ(a)
if(this.e.hW(z))a.preventDefault()},"$1","gfq",4,0,13],
iO:[function(a){var z
H.f(a,"$isbm")
this.c4(a)
z=this.bZ(a)
if(this.e.hX(z))a.preventDefault()},"$1","gfs",4,0,13]}}],["","",,D,{"^":"",cj:{"^":"b;0a,0b,0c,0d",
gB:function(){var z=this.d
if(z==null){z=D.Q()
this.d=z}return z},
aD:[function(a){var z
H.f(a,"$isu")
z=this.d
if(!(z==null))z.G(a)},function(){return this.aD(null)},"ii","$1","$0","geC",0,2,1],
$isa2:1,
$isaL:1,
p:{
cU:function(a,b){var z,y,x,w
z=new D.cj()
z.c=new V.Z(1,1,1)
z.a=new V.E(0,0,1)
y=z.b
z.b=b
x=b.gB()
x.toString
w=H.h(z.geC(),{func:1,ret:-1,args:[D.u]})
C.a.h(x.a,w)
x=new D.H("mover",y,z.b,z,[U.a8])
x.b=!0
z.aD(x)
if(!z.c.u(0,a)){y=z.c
z.c=a
x=new D.H("color",y,a,z,[V.Z])
x.b=!0
z.aD(x)}return z}}},a2:{"^":"b;",$isaL:1},i3:{"^":"aJ;0e,0f,0r,0x,0y,0z,0Q,0ch,0a,0b,0c,0d",
gB:function(){var z=this.Q
if(z==null){z=D.Q()
this.Q=z}return z},
aD:function(a){var z=this.Q
if(!(z==null))z.G(a)},
ff:[function(a){var z
H.f(a,"$isu")
z=this.ch
if(!(z==null))z.G(a)},function(){return this.ff(null)},"iE","$1","$0","gd6",0,2,1],
iK:[function(a){var z,y,x
H.w(a,"$isk",[D.a2],"$ask")
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.A)(a),++y){x=a[y]
if(x==null||this.eN(x))return!1}return!0},"$1","gfn",4,0,37],
ir:[function(a,b){var z,y,x,w,v,u,t,s
z=D.a2
H.w(b,"$isk",[z],"$ask")
for(y=b.length,x=this.gd6(),w={func:1,ret:-1,args:[D.u]},v=[w],u=0;u<b.length;b.length===y||(0,H.A)(b),++u){t=H.f(b[u],"$isa2")
if(t instanceof D.cj)C.a.h(this.e,t)
s=t.d
if(s==null){s=new D.b7()
s.a=H.e([],v)
s.c=0
t.d=s}H.h(x,w)
C.a.h(s.a,x)}z=new D.cn(a,b,this,[z])
z.b=!0
this.aD(z)},"$2","gf2",8,0,18],
iM:[function(a,b){var z,y,x,w,v,u,t,s
z=D.a2
H.w(b,"$isk",[z],"$ask")
for(y=b.length,x=this.gd6(),w={func:1,ret:-1,args:[D.u]},v=[w],u=0;u<b.length;b.length===y||(0,H.A)(b),++u){t=H.f(b[u],"$isa2")
if(t instanceof D.cj)C.a.S(this.e,t)
s=t.d
if(s==null){s=new D.b7()
s.a=H.e([],v)
s.c=0
t.d=s}H.h(x,w)
C.a.S(s.a,x)}z=new D.co(a,b,this,[z])
z.b=!0
this.aD(z)},"$2","gfp",8,0,18],
eN:function(a){var z=C.a.bq(this.e,a)
return z},
$ask:function(){return[D.a2]},
$asaJ:function(){return[D.a2]}},iI:{"^":"b;",$isa2:1,$isaL:1},jj:{"^":"b;",$isa2:1,$isaL:1},jt:{"^":"b;",$isa2:1,$isaL:1},ju:{"^":"b;",$isa2:1,$isaL:1},jv:{"^":"b;",$isa2:1,$isaL:1}}],["","",,V,{"^":"",
nj:[function(a,b){if(typeof b!=="number")return b.M()
if(typeof a!=="number")return H.p(a)
return Math.abs(b-a)<=1e-9},"$2","iw",8,0,33],
cI:function(a,b,c){var z
if(c<=b)return b
z=c-b
a=C.h.bg(a-b,z)
return(a<0?a+z:a)+b},
I:function(a,b,c){if(a==null)return C.b.a9("null",c)
return C.b.a9(C.h.ed($.o.$2(a,0)?0:a,b),c+b+1)},
bv:function(a,b,c){var z,y,x,w,v,u
H.w(a,"$isc",[P.q],"$asc")
z=H.e([],[P.i])
for(y=a.length,x=0,w=0;w<a.length;a.length===y||(0,H.A)(a),++w){v=V.I(a[w],b,c)
x=Math.max(x,v.length)
C.a.h(z,v)}for(u=z.length-1;u>=0;--u){if(u>=z.length)return H.d(z,u)
C.a.m(z,u,C.b.a9(z[u],x))}return z},
Z:{"^":"b;a,b,c",
j:function(a,b){var z,y,x
z=b*this.a
y=b*this.b
x=b*this.c
if(z<0)z=0
else if(z>1)z=1
if(y<0)y=0
else if(y>1)y=1
if(x<0)x=0
else if(x>1)x=1
return new V.Z(z,y,x)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.Z))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+"]"}},
b3:{"^":"b;a,b,c,d",
j:function(a,b){var z,y,x,w
z=b*this.a
y=b*this.b
x=b*this.c
w=b*this.d
if(z<0)z=0
else if(z>1)z=1
if(y<0)y=0
else if(y>1)y=1
if(x<0)x=0
else if(x>1)x=1
if(w<0)w=0
else if(w>1)w=1
return new V.b3(z,y,x,w)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.b3))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
z=b.d
if(!$.o.$2(z,this.d))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+", "+V.I(this.d,3,0)+"]"}},
cq:{"^":"b;a,b,c,d,e,f,r,x,y",
ac:function(a,b){var z=H.e([this.a,this.d,this.r,this.b,this.e,this.x,this.c,this.f,this.y],[P.q])
return z},
j:function(a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
H.f(a5,"$iscq")
z=this.a
y=a5.a
if(typeof z!=="number")return z.j()
x=C.h.j(z,y)
w=this.b
v=a5.d
if(typeof w!=="number")return w.j()
u=C.h.j(w,v)
t=this.c
s=a5.r
if(typeof t!=="number")return t.j()
r=C.h.j(t,s)
q=a5.b
p=C.h.j(z,q)
o=a5.e
n=C.h.j(w,o)
m=a5.x
l=C.h.j(t,m)
k=a5.c
z=C.h.j(z,k)
j=a5.f
w=C.h.j(w,j)
i=a5.y
t=C.h.j(t,i)
h=this.d
if(typeof h!=="number")return h.j()
g=C.h.j(h,y)
f=this.e
if(typeof f!=="number")return f.j()
e=C.h.j(f,v)
d=this.f
if(typeof d!=="number")return d.j()
c=C.h.j(d,s)
b=C.h.j(h,q)
a=C.h.j(f,o)
a0=C.h.j(d,m)
h=C.h.j(h,k)
f=C.h.j(f,j)
d=C.h.j(d,i)
a1=this.r
if(typeof a1!=="number")return a1.j()
y=C.h.j(a1,y)
a2=this.x
if(typeof a2!=="number")return a2.j()
v=C.h.j(a2,v)
a3=this.y
if(typeof a3!=="number")return a3.j()
return new V.cq(x+u+r,p+n+l,z+w+t,g+e+c,b+a+a0,h+f+d,y+v+C.h.j(a3,s),C.h.j(a1,q)+C.h.j(a2,o)+C.h.j(a3,m),C.h.j(a1,k)+C.h.j(a2,j)+C.h.j(a3,i))},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.cq))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
z=b.d
if(!$.o.$2(z,this.d))return!1
z=b.e
if(!$.o.$2(z,this.e))return!1
z=b.f
if(!$.o.$2(z,this.f))return!1
z=b.r
if(!$.o.$2(z,this.r))return!1
z=b.x
if(!$.o.$2(z,this.x))return!1
z=b.y
if(!$.o.$2(z,this.y))return!1
return!0},
i:function(a){var z,y,x,w,v,u,t,s
z=[P.q]
y=V.bv(H.e([this.a,this.d,this.r],z),3,0)
x=V.bv(H.e([this.b,this.e,this.x],z),3,0)
w=V.bv(H.e([this.c,this.f,this.y],z),3,0)
z=y.length
if(0>=z)return H.d(y,0)
v="["+y[0]+", "
u=x.length
if(0>=u)return H.d(x,0)
v=v+x[0]+", "
t=w.length
if(0>=t)return H.d(w,0)
v=v+w[0]+",\n"
if(1>=z)return H.d(y,1)
s=" "+y[1]+", "
if(1>=u)return H.d(x,1)
s=s+x[1]+", "
if(1>=t)return H.d(w,1)
s=v+(s+w[1]+",\n")
if(2>=z)return H.d(y,2)
z=" "+y[2]+", "
if(2>=u)return H.d(x,2)
z=z+x[2]+", "
if(2>=t)return H.d(w,2)
return s+(z+w[2]+"]")}},
av:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
ac:function(a,b){var z=H.e([this.a,this.e,this.y,this.cx,this.b,this.f,this.z,this.cy,this.c,this.r,this.Q,this.db,this.d,this.x,this.ch,this.dx],[P.q])
return z},
dW:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=this.a
y=this.f
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.p(y)
x=this.b
w=this.e
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.p(w)
v=z*y-x*w
u=this.r
if(typeof u!=="number")return H.p(u)
t=this.c
if(typeof t!=="number")return t.j()
s=z*u-t*w
r=this.x
if(typeof r!=="number")return H.p(r)
q=this.d
if(typeof q!=="number")return q.j()
p=z*r-q*w
o=x*u-t*y
n=x*r-q*y
m=t*r-q*u
l=this.y
k=this.cy
if(typeof l!=="number")return l.j()
if(typeof k!=="number")return H.p(k)
j=this.z
i=this.cx
if(typeof j!=="number")return j.j()
if(typeof i!=="number")return H.p(i)
h=l*k-j*i
g=this.db
if(typeof g!=="number")return H.p(g)
f=this.Q
if(typeof f!=="number")return f.j()
e=l*g-f*i
d=this.dx
if(typeof d!=="number")return H.p(d)
c=this.ch
if(typeof c!=="number")return c.j()
b=l*d-c*i
a=j*g-f*k
a0=j*d-c*k
a1=f*d-c*g
a2=v*a1-s*a0+p*a+o*b-n*e+m*h
if($.o.$2(a2,0))return V.c5()
a3=1/a2
a4=-w
a5=-i
return V.aB((y*a1-u*a0+r*a)*a3,(-x*a1+t*a0-q*a)*a3,(k*m-g*n+d*o)*a3,(-j*m+f*n-c*o)*a3,(a4*a1+u*b-r*e)*a3,(z*a1-t*b+q*e)*a3,(a5*m+g*p-d*s)*a3,(l*m-f*p+c*s)*a3,(w*a0-y*b+r*h)*a3,(-z*a0+x*b-q*h)*a3,(i*n-k*p+d*v)*a3,(-l*n+j*p-c*v)*a3,(a4*a+y*e-u*h)*a3,(z*a-x*e+t*h)*a3,(a5*o+k*s-g*v)*a3,(l*o-j*s+f*v)*a3)},
j:function(a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
H.f(a7,"$isav")
z=this.a
y=a7.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.p(y)
x=this.b
w=a7.e
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.p(w)
v=this.c
u=a7.y
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.p(u)
t=this.d
s=a7.cx
if(typeof t!=="number")return t.j()
if(typeof s!=="number")return H.p(s)
r=a7.b
if(typeof r!=="number")return H.p(r)
q=a7.f
if(typeof q!=="number")return H.p(q)
p=a7.z
if(typeof p!=="number")return H.p(p)
o=a7.cy
if(typeof o!=="number")return H.p(o)
n=a7.c
if(typeof n!=="number")return H.p(n)
m=a7.r
if(typeof m!=="number")return H.p(m)
l=a7.Q
if(typeof l!=="number")return H.p(l)
k=a7.db
if(typeof k!=="number")return H.p(k)
j=a7.d
if(typeof j!=="number")return H.p(j)
i=a7.x
if(typeof i!=="number")return H.p(i)
h=a7.ch
if(typeof h!=="number")return H.p(h)
g=a7.dx
if(typeof g!=="number")return H.p(g)
f=this.e
if(typeof f!=="number")return f.j()
e=this.f
if(typeof e!=="number")return e.j()
d=this.r
if(typeof d!=="number")return d.j()
c=this.x
if(typeof c!=="number")return c.j()
b=this.y
if(typeof b!=="number")return b.j()
a=this.z
if(typeof a!=="number")return a.j()
a0=this.Q
if(typeof a0!=="number")return a0.j()
a1=this.ch
if(typeof a1!=="number")return a1.j()
a2=this.cx
if(typeof a2!=="number")return a2.j()
a3=this.cy
if(typeof a3!=="number")return a3.j()
a4=this.db
if(typeof a4!=="number")return a4.j()
a5=this.dx
if(typeof a5!=="number")return a5.j()
return V.aB(z*y+x*w+v*u+t*s,z*r+x*q+v*p+t*o,z*n+x*m+v*l+t*k,z*j+x*i+v*h+t*g,f*y+e*w+d*u+c*s,f*r+e*q+d*p+c*o,f*n+e*m+d*l+c*k,f*j+e*i+d*h+c*g,b*y+a*w+a0*u+a1*s,b*r+a*q+a0*p+a1*o,b*n+a*m+a0*l+a1*k,b*j+a*i+a0*h+a1*g,a2*y+a3*w+a4*u+a5*s,a2*r+a3*q+a4*p+a5*o,a2*n+a3*m+a4*l+a5*k,a2*j+a3*i+a4*h+a5*g)},
cH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
t=this.e
if(typeof t!=="number")return t.j()
s=this.f
if(typeof s!=="number")return s.j()
r=this.r
if(typeof r!=="number")return r.j()
q=this.y
if(typeof q!=="number")return q.j()
p=this.z
if(typeof p!=="number")return p.j()
o=this.Q
if(typeof o!=="number")return o.j()
return new V.E(z*y+x*w+v*u,t*y+s*w+r*u,q*y+p*w+o*u)},
be:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
t=this.d
if(typeof t!=="number")return H.p(t)
s=this.e
if(typeof s!=="number")return s.j()
r=this.f
if(typeof r!=="number")return r.j()
q=this.r
if(typeof q!=="number")return q.j()
p=this.x
if(typeof p!=="number")return H.p(p)
o=this.y
if(typeof o!=="number")return o.j()
n=this.z
if(typeof n!=="number")return n.j()
m=this.Q
if(typeof m!=="number")return m.j()
l=this.ch
if(typeof l!=="number")return H.p(l)
return new V.a3(z*y+x*w+v*u+t,s*y+r*w+q*u+p,o*y+n*w+m*u+l)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.av))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
z=b.d
if(!$.o.$2(z,this.d))return!1
z=b.e
if(!$.o.$2(z,this.e))return!1
z=b.f
if(!$.o.$2(z,this.f))return!1
z=b.r
if(!$.o.$2(z,this.r))return!1
z=b.x
if(!$.o.$2(z,this.x))return!1
z=b.y
if(!$.o.$2(z,this.y))return!1
z=b.z
if(!$.o.$2(z,this.z))return!1
z=b.Q
if(!$.o.$2(z,this.Q))return!1
z=b.ch
if(!$.o.$2(z,this.ch))return!1
z=b.cx
if(!$.o.$2(z,this.cx))return!1
z=b.cy
if(!$.o.$2(z,this.cy))return!1
z=b.db
if(!$.o.$2(z,this.db))return!1
z=b.dx
if(!$.o.$2(z,this.dx))return!1
return!0},
i:function(a){return this.N()},
dO:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=[P.q]
y=V.bv(H.e([this.a,this.e,this.y,this.cx],z),b,c)
x=V.bv(H.e([this.b,this.f,this.z,this.cy],z),b,c)
w=V.bv(H.e([this.c,this.r,this.Q,this.db],z),b,c)
v=V.bv(H.e([this.d,this.x,this.ch,this.dx],z),b,c)
z=y.length
if(0>=z)return H.d(y,0)
u="["+y[0]+", "
t=x.length
if(0>=t)return H.d(x,0)
u=u+x[0]+", "
s=w.length
if(0>=s)return H.d(w,0)
u=u+w[0]+", "
r=v.length
if(0>=r)return H.d(v,0)
u=u+v[0]+",\n"
q=a+" "
if(1>=z)return H.d(y,1)
q=q+y[1]+", "
if(1>=t)return H.d(x,1)
q=q+x[1]+", "
if(1>=s)return H.d(w,1)
q=q+w[1]+", "
if(1>=r)return H.d(v,1)
q=u+(q+v[1]+",\n")
u=a+" "
if(2>=z)return H.d(y,2)
u=u+y[2]+", "
if(2>=t)return H.d(x,2)
u=u+x[2]+", "
if(2>=s)return H.d(w,2)
u=u+w[2]+", "
if(2>=r)return H.d(v,2)
u=q+(u+v[2]+",\n")
q=a+" "
if(3>=z)return H.d(y,3)
q=q+y[3]+", "
if(3>=t)return H.d(x,3)
q=q+x[3]+", "
if(3>=s)return H.d(w,3)
q=q+w[3]+", "
if(3>=r)return H.d(v,3)
return u+(q+v[3]+"]")},
N:function(){return this.dO("",3,0)},
C:function(a){return this.dO(a,3,0)},
p:{
aB:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new V.av(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)},
c5:function(){return V.aB(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},
ep:function(a,b,c,d){return V.aB(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,d)},
em:function(a){var z,y
z=Math.cos(a)
y=Math.sin(a)
return V.aB(1,0,0,0,0,z,-y,0,0,y,z,0,0,0,0,1)},
en:function(a){var z,y
z=Math.cos(a)
y=Math.sin(a)
return V.aB(z,0,-y,0,0,1,0,0,y,0,z,0,0,0,0,1)},
eo:function(a){var z,y
z=Math.cos(a)
y=Math.sin(a)
return V.aB(z,-y,0,0,y,z,0,0,0,0,1,0,0,0,0,1)}}},
V:{"^":"b;q:a>,t:b>",
M:function(a,b){return new V.V(this.a-b.a,this.b-b.b)},
j:function(a,b){return new V.V(this.a*b,this.b*b)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.V))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+"]"}},
a3:{"^":"b;q:a>,t:b>,c",
D:function(a,b){return new V.a3(this.a+b.a,this.b+b.b,this.c+b.c)},
M:function(a,b){return new V.a3(this.a-b.a,this.b-b.b,this.c-b.c)},
j:function(a,b){return new V.a3(this.a*b,this.b*b,this.c*b)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.a3))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+"]"}},
bL:{"^":"b;q:a>,t:b>,c,d",
j:function(a,b){return new V.bL(this.a*b,this.b*b,this.c*b,this.d*b)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.bL))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
z=b.d
if(!$.o.$2(z,this.d))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+", "+V.I(this.d,3,0)+"]"}},
ex:{"^":"b;q:a>,t:b>,c,d",
ga4:function(){var z,y
z=this.c
y=this.d
if(z>y)return y
else return z},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.ex))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
z=b.d
if(!$.o.$2(z,this.d))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+", "+V.I(this.d,3,0)+"]"},
p:{
ey:function(a,b,c,d){if(c<0){a+=c
c=-c}if(d<0){b+=d
d=-d}return new V.ex(a,b,c,d)}}},
W:{"^":"b;a,b",
hI:[function(a){return Math.sqrt(this.F(this))},"$0","gl",1,0,24],
F:function(a){var z,y,x,w
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.p(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.p(w)
return z*y+x*w},
j:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.j()
y=this.b
if(typeof y!=="number")return y.j()
return new V.W(z*b,y*b)},
w:function(a,b){var z,y
if($.o.$2(b,0))return new V.W(0,0)
z=this.a
if(typeof z!=="number")return z.w()
y=this.b
if(typeof y!=="number")return y.w()
return new V.W(z/b,y/b)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.W))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+"]"}},
E:{"^":"b;a,b,c",
hI:[function(a){return Math.sqrt(this.F(this))},"$0","gl",1,0,24],
F:function(a){return this.a*a.a+this.b*a.b+this.c*a.c},
ct:function(a,b){var z,y,x
z=this.a
y=this.b
x=this.c
return new V.E(z+b*(a.a-z),y+b*(a.b-y),x+b*(a.c-x))},
aw:function(a){var z,y,x,w,v,u
z=this.b
y=a.c
x=this.c
w=a.b
v=a.a
u=this.a
return new V.E(z*y-x*w,x*v-u*y,u*w-z*v)},
D:function(a,b){return new V.E(this.a+b.a,this.b+b.b,this.c+b.c)},
P:function(a){return new V.E(-this.a,-this.b,-this.c)},
j:function(a,b){return new V.E(this.a*b,this.b*b,this.c*b)},
w:function(a,b){if($.o.$2(b,0))return new V.E(0,0,0)
return new V.E(this.a/b,this.b/b,this.c/b)},
dX:function(){if(!$.o.$2(0,this.a))return!1
if(!$.o.$2(0,this.b))return!1
if(!$.o.$2(0,this.c))return!1
return!0},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.E))return!1
z=b.a
if(!$.o.$2(z,this.a))return!1
z=b.b
if(!$.o.$2(z,this.b))return!1
z=b.c
if(!$.o.$2(z,this.c))return!1
return!0},
i:function(a){return"["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+"]"}}}],["","",,U,{"^":"",hs:{"^":"dV;0a,0b,0c,0d,0e,0f,0r,0x,0y",
bN:function(a){var z=V.cI(a,this.c,this.b)
return z},
gB:function(){var z=this.y
if(z==null){z=D.Q()
this.y=z}return z},
K:function(a){var z=this.y
if(!(z==null))z.G(a)},
scJ:function(a,b){},
scu:function(a){var z,y
z=this.b
if(!$.o.$2(z,a)){y=this.b
this.b=a
if(a<this.c){this.c=a
this.d=a}else{z=this.d
if(a<z)this.d=this.bN(z)}z=new D.H("maximumLocation",y,this.b,this,[P.q])
z.b=!0
this.K(z)}},
scw:function(a){var z,y
z=this.c
if(!$.o.$2(z,a)){y=this.c
this.c=a
if(this.b<a){this.b=a
this.d=a}else{z=this.d
if(a>z)this.d=this.bN(z)}z=new D.H("minimumLocation",y,this.c,this,[P.q])
z.b=!0
this.K(z)}},
sa_:function(a,b){var z,y
b=this.bN(b)
z=this.d
if(!$.o.$2(z,b)){y=this.d
this.d=b
z=new D.H("location",y,b,this,[P.q])
z.b=!0
this.K(z)}},
scv:function(a){var z,y,x
z=this.e
if(!$.o.$2(z,a)){y=this.e
this.e=a
z=this.f
x=-a
if(z<x)z=x
else if(z>a)z=a
this.f=z
z=new D.H("maximumVelocity",y,a,this,[P.q])
z.b=!0
this.K(z)}},
sV:function(a){var z,y,x
z=this.e
y=-z
if(a<y)a=y
else if(a>z)a=z
z=this.f
if(!$.o.$2(z,a)){x=this.f
this.f=a
z=new D.H("velocity",x,a,this,[P.q])
z.b=!0
this.K(z)}},
sci:function(a){var z,y
if(a<0)a=0
else if(a>1)a=1
z=this.x
if(!$.o.$2(z,a)){y=this.x
this.x=a
z=new D.H("dampening",y,a,this,[P.q])
z.b=!0
this.K(z)}},
ap:function(a,b){var z,y,x,w
z=this.f
if($.o.$2(z,0)){z=this.r
z=!$.o.$2(z,0)}else z=!0
if(z){y=this.f+this.r*b
z=this.e
x=-z
if(y<x)y=x
else if(y>z)y=z
this.sa_(0,this.d+y*b)
z=this.x
if(!$.o.$2(z,0)){w=y*Math.pow(1-this.x,b)
if(y<0){if(w<y)w=y
else if(w>0)w=0}else if(w<0)w=0
else if(w>y)w=y
y=w}this.sV(y)}},
p:{
cS:function(){var z=new U.hs()
z.a=!0
z.b=1e12
z.c=-1e12
z.d=0
z.e=100
z.f=0
z.x=0
z.r=0
return z}}},dX:{"^":"a8;0a,0b",
gB:function(){var z=this.b
if(z==null){z=D.Q()
this.b=z}return z},
aq:function(a,b,c){return this.a},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.dX))return!1
return J.P(this.a,b.a)},
i:function(a){return"Constant: "+this.a.C("          ")},
p:{
dY:function(a){var z=new U.dX()
z.a=a
return z}}},e9:{"^":"aJ;0e,0f,0r,0a,0b,0c,0d",
gB:function(){var z=this.e
if(z==null){z=D.Q()
this.e=z}return z},
K:[function(a){var z
H.f(a,"$isu")
z=this.e
if(!(z==null))z.G(a)},function(){return this.K(null)},"ae","$1","$0","gaE",0,2,1],
iq:[function(a,b){var z,y,x,w,v,u,t
z=U.a8
H.w(b,"$isk",[z],"$ask")
for(y=b.length,x=this.gaE(),w={func:1,ret:-1,args:[D.u]},v=0;v<b.length;b.length===y||(0,H.A)(b),++v){u=b[v]
if(u!=null){t=u.gB()
t.toString
H.h(x,w)
C.a.h(t.a,x)}}z=new D.cn(a,b,this,[z])
z.b=!0
this.K(z)},"$2","gf1",8,0,23],
iL:[function(a,b){var z,y,x,w,v,u,t
z=U.a8
H.w(b,"$isk",[z],"$ask")
for(y=b.length,x=this.gaE(),w={func:1,ret:-1,args:[D.u]},v=0;v<b.length;b.length===y||(0,H.A)(b),++v){u=b[v]
if(u!=null){t=u.gB()
t.toString
H.h(x,w)
C.a.S(t.a,x)}}z=new D.co(a,b,this,[z])
z.b=!0
this.K(z)},"$2","gfo",8,0,23],
aq:function(a,b,c){var z,y,x,w
z=this.r
y=b.e
if(typeof z!=="number")return z.O()
if(z<y){this.r=y
z=this.e
if(!(z==null))++z.c
for(z=this.a,z=new J.az(z,z.length,0,[H.y(z,0)]),x=null;z.I();){y=z.d
if(y!=null){w=y.aq(0,b,c)
if(w!=null)x=x==null?w:w.j(0,x)}}this.f=x==null?V.c5():x
z=this.e
if(!(z==null))z.aa(0)}return this.f},
u:function(a,b){var z,y,x,w
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.e9))return!1
z=this.a.length
for(y=0;y<z;++y){x=this.a
if(y>=x.length)return H.d(x,y)
x=x[y]
w=b.a
if(y>=w.length)return H.d(w,y)
if(!J.P(x,w[y]))return!1}return!0},
i:function(a){return"Group"},
$ask:function(){return[U.a8]},
$asaJ:function(){return[U.a8]},
$isa8:1},a8:{"^":"dV;"},eA:{"^":"a8;0a,0b,0c,0d,0e,0f,0r,0x,0y",
gB:function(){var z=this.y
if(z==null){z=D.Q()
this.y=z}return z},
K:function(a){var z=this.y
if(!(z==null))z.G(a)},
seh:function(a){var z,y
a=V.cI(a,0,6.283185307179586)
z=this.a
if(!$.o.$2(z,a)){y=this.a
this.a=a
z=new D.H("yaw",y,a,this,[P.q])
z.b=!0
this.K(z)}},
se3:function(a,b){var z,y
b=V.cI(b,0,6.283185307179586)
z=this.b
if(!$.o.$2(z,b)){y=this.b
this.b=b
z=new D.H("pitch",y,b,this,[P.q])
z.b=!0
this.K(z)}},
se8:function(a){var z,y
a=V.cI(a,0,6.283185307179586)
z=this.c
if(!$.o.$2(z,a)){y=this.c
this.c=a
z=new D.H("roll",y,a,this,[P.q])
z.b=!0
this.K(z)}},
aq:function(a,b,c){var z,y
z=this.r
y=b.e
if(z<y){this.r=y
z=this.y
if(!(z==null))++z.c
this.seh(this.a+this.d*b.y)
this.se3(0,this.b+this.e*b.y)
this.se8(this.c+this.f*b.y)
this.x=V.eo(this.c).j(0,V.en(this.b)).j(0,V.em(this.a))
z=this.y
if(!(z==null))z.aa(0)}return this.x},
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.eA))return!1
z=this.a
y=b.a
if(!$.o.$2(z,y))return!1
z=this.b
y=b.b
if(!$.o.$2(z,y))return!1
z=this.c
y=b.c
if(!$.o.$2(z,y))return!1
z=this.d
y=b.d
if(!$.o.$2(z,y))return!1
z=this.e
y=b.e
if(!$.o.$2(z,y))return!1
z=this.f
y=b.f
if(!$.o.$2(z,y))return!1
return!0},
i:function(a){return"Rotater: ["+V.I(this.a,3,0)+", "+V.I(this.b,3,0)+", "+V.I(this.c,3,0)+"], ["+V.I(this.d,3,0)+", "+V.I(this.e,3,0)+", "+V.I(this.f,3,0)+"]"},
p:{
d9:function(a,b,c,d,e,f){var z,y,x
z=new U.eA()
z.a=0
z.b=0
z.c=0
z.d=0
z.e=0
z.f=0
z.r=0
z.seh(f)
z.se3(0,d)
z.se8(e)
y=z.d
if(!$.o.$2(y,c)){x=z.d
z.d=c
y=new D.H("deltaYaw",x,c,z,[P.q])
y.b=!0
z.K(y)}y=z.e
if(!$.o.$2(y,a)){x=z.e
z.e=a
y=new D.H("deltaPitch",x,a,z,[P.q])
y.b=!0
z.K(y)}y=z.f
if(!$.o.$2(y,b)){x=z.f
z.f=b
y=new D.H("deltaRoll",x,b,z,[P.q])
y.b=!0
z.K(y)}return z}}},k0:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy",
gB:function(){var z=this.cy
if(z==null){z=D.Q()
this.cy=z}return z},
K:[function(a){var z
H.f(a,"$isu")
z=this.cy
if(!(z==null))z.G(a)},function(){return this.K(null)},"ae","$1","$0","gaE",0,2,1],
aX:function(a){var z,y,x
if(this.a!=null)return!1
this.a=a
z=a.c.gdn()
z.toString
y={func:1,ret:-1,args:[D.u]}
x=H.h(this.gbU(),y)
C.a.h(z.a,x)
x=this.a.c.gdY()
x.toString
z=H.h(this.gbV(),y)
C.a.h(x.a,z)
z=this.a.c.gbH()
z.toString
y=H.h(this.gbW(),y)
C.a.h(z.a,y)
return!0},
eY:[function(a){H.f(a,"$isu")
if(!J.P(this.c,this.a.b.c))return
this.y=!0
this.x=!0
this.z=this.b.d},"$1","gbU",4,0,2],
eZ:[function(a){var z,y,x,w,v,u,t
a=H.j(H.f(a,"$isu"),"$isbH")
if(!this.y)return
if(this.x){z=a.d.M(0,a.y)
z=new V.W(z.a,z.b)
z=z.F(z)
y=this.r
if(typeof y!=="number")return H.p(y)
if(z<y)return
this.x=!1}if(this.d){z=a.c
y=a.d.M(0,a.y)
z=new V.W(y.a,y.b).j(0,2).w(0,z.ga4())
this.Q=z
y=this.b
z=z.a
if(typeof z!=="number")return z.j()
x=this.e
if(typeof x!=="number")return H.p(x)
y.sV(z*10*x)}else{z=a.c
y=a.d
x=y.M(0,a.y)
w=new V.W(x.a,x.b).j(0,2).w(0,z.ga4())
x=this.b
v=w.a
if(typeof v!=="number")return v.P()
u=this.e
if(typeof u!=="number")return H.p(u)
t=this.z
if(typeof t!=="number")return H.p(t)
x.sa_(0,-v*u+t)
this.b.sV(0)
y=y.M(0,a.z)
this.Q=new V.W(y.a,y.b).j(0,2).w(0,z.ga4())}this.ae()},"$1","gbV",4,0,2],
f_:[function(a){var z,y,x
H.f(a,"$isu")
if(!this.y)return
this.y=!1
if(this.x)return
z=this.Q
if(z.F(z)>0.0001){z=this.b
y=this.Q.a
if(typeof y!=="number")return y.j()
x=this.e
if(typeof x!=="number")return H.p(x)
z.sV(y*10*x)
this.ae()}},"$1","gbW",4,0,2],
aq:function(a,b,c){var z,y,x
z=this.ch
y=b.e
if(typeof z!=="number")return z.O()
if(z<y){this.ch=y
x=b.y
this.b.ap(0,x)
this.cx=V.eo(this.b.d)}return this.cx},
$isa8:1},k1:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx",
gB:function(){var z=this.fx
if(z==null){z=D.Q()
this.fx=z}return z},
K:[function(a){var z
H.f(a,"$isu")
z=this.fx
if(!(z==null))z.G(a)},function(){return this.K(null)},"ae","$1","$0","gaE",0,2,1],
aX:function(a){var z,y,x
if(this.a!=null)return!1
this.a=a
z=a.c.gdn()
z.toString
y={func:1,ret:-1,args:[D.u]}
x=H.h(this.gbU(),y)
C.a.h(z.a,x)
x=this.a.c.gdY()
x.toString
z=H.h(this.gbV(),y)
C.a.h(x.a,z)
z=this.a.c.gbH()
z.toString
x=H.h(this.gbW(),y)
C.a.h(z.a,x)
x=this.a.d
z=x.f
if(z==null){z=D.Q()
x.f=z}x=H.h(this.geV(),y)
C.a.h(z.a,x)
x=this.a.d
z=x.d
if(z==null){z=D.Q()
x.d=z}x=H.h(this.geW(),y)
C.a.h(z.a,x)
x=this.a.e
z=x.b
if(z==null){z=D.Q()
x.b=z}x=H.h(this.gfP(),y)
C.a.h(z.a,x)
x=this.a.e
z=x.d
if(z==null){z=D.Q()
x.d=z}x=H.h(this.gfO(),y)
C.a.h(z.a,x)
x=this.a.e
z=x.c
if(z==null){z=D.Q()
x.c=z}y=H.h(this.gfN(),y)
C.a.h(z.a,y)
return!0},
al:function(a){var z,y
z=a.a
y=a.b
if(this.f){if(typeof z!=="number")return z.P()
z=-z}if(this.r){if(typeof y!=="number")return y.P()
y=-y}return new V.W(z,y)},
eY:[function(a){a=H.j(H.f(a,"$isu"),"$isbH")
if(!J.P(this.d,a.x.b))return
this.cx=!0
this.ch=!0
this.cy=this.c.d
this.db=this.b.d},"$1","gbU",4,0,2],
eZ:[function(a){var z,y,x,w,v,u,t
a=H.j(H.f(a,"$isu"),"$isbH")
if(!this.cx)return
if(this.ch){z=a.d.M(0,a.y)
z=new V.W(z.a,z.b)
z=z.F(z)
y=this.Q
if(typeof y!=="number")return H.p(y)
if(z<y)return
this.ch=!1}if(this.e){z=a.c
y=a.d.M(0,a.y)
z=this.al(new V.W(y.a,y.b).j(0,2).w(0,z.ga4()))
this.dx=z
y=this.c
z=z.a
if(typeof z!=="number")return z.P()
x=this.y
if(typeof x!=="number")return H.p(x)
y.sV(-z*10*x)
x=this.b
z=this.dx.b
if(typeof z!=="number")return z.P()
y=this.x
if(typeof y!=="number")return H.p(y)
x.sV(-z*10*y)}else{z=a.c
y=a.d
x=y.M(0,a.y)
w=this.al(new V.W(x.a,x.b).j(0,2).w(0,z.ga4()))
x=this.c
v=w.a
if(typeof v!=="number")return v.P()
u=this.y
if(typeof u!=="number")return H.p(u)
t=this.cy
if(typeof t!=="number")return H.p(t)
x.sa_(0,-v*u+t)
t=this.b
u=w.b
if(typeof u!=="number")return u.P()
v=this.x
if(typeof v!=="number")return H.p(v)
x=this.db
if(typeof x!=="number")return H.p(x)
t.sa_(0,-u*v+x)
this.b.sV(0)
this.c.sV(0)
y=y.M(0,a.z)
this.dx=this.al(new V.W(y.a,y.b).j(0,2).w(0,z.ga4()))}this.ae()},"$1","gbV",4,0,2],
f_:[function(a){var z,y,x
H.f(a,"$isu")
if(!this.cx)return
this.cx=!1
if(this.ch)return
z=this.dx
if(z.F(z)>0.0001){z=this.c
y=this.dx.a
if(typeof y!=="number")return y.P()
x=this.y
if(typeof x!=="number")return H.p(x)
z.sV(-y*10*x)
x=this.b
y=this.dx.b
if(typeof y!=="number")return y.P()
z=this.x
if(typeof z!=="number")return H.p(z)
x.sV(-y*10*z)
this.ae()}},"$1","gbW",4,0,2],
im:[function(a){if(H.j(H.f(a,"$isu"),"$isek").x){this.ch=!0
this.cy=this.c.d
this.db=this.b.d}},"$1","geV",4,0,2],
io:[function(a){var z,y,x,w,v,u,t
a=H.j(H.f(a,"$isu"),"$isbH")
if(!J.P(this.d,a.x.b))return
z=a.c
y=a.d
x=y.M(0,a.y)
w=this.al(new V.W(x.a,x.b).j(0,2).w(0,z.ga4()))
x=this.c
v=w.a
if(typeof v!=="number")return v.P()
u=this.y
if(typeof u!=="number")return H.p(u)
t=this.cy
if(typeof t!=="number")return H.p(t)
x.sa_(0,-v*u+t)
t=this.b
u=w.b
if(typeof u!=="number")return u.P()
v=this.x
if(typeof v!=="number")return H.p(v)
x=this.db
if(typeof x!=="number")return H.p(x)
t.sa_(0,-u*v+x)
this.b.sV(0)
this.c.sV(0)
y=y.M(0,a.z)
this.dx=this.al(new V.W(y.a,y.b).j(0,2).w(0,z.ga4()))
this.ae()},"$1","geW",4,0,2],
iT:[function(a){H.f(a,"$isu")
this.cx=!0
this.ch=!0
this.cy=this.c.d
this.db=this.b.d},"$1","gfP",4,0,2],
iS:[function(a){var z,y,x,w,v,u,t
a=H.j(H.f(a,"$isu"),"$iseO")
if(!this.cx)return
if(this.ch){z=a.d.M(0,a.y)
z=new V.W(z.a,z.b)
z=z.F(z)
y=this.Q
if(typeof y!=="number")return H.p(y)
if(z<y)return
this.ch=!1}if(this.e){z=a.c
y=a.d.M(0,a.y)
z=this.al(new V.W(y.a,y.b).j(0,2).w(0,z.ga4()))
this.dx=z
y=this.c
z=z.a
if(typeof z!=="number")return z.P()
x=this.y
if(typeof x!=="number")return H.p(x)
y.sV(-z*10*x)
x=this.b
z=this.dx.b
if(typeof z!=="number")return z.P()
y=this.x
if(typeof y!=="number")return H.p(y)
x.sV(-z*10*y)}else{z=a.c
y=a.d
x=y.M(0,a.y)
w=this.al(new V.W(x.a,x.b).j(0,2).w(0,z.ga4()))
x=this.c
v=w.a
if(typeof v!=="number")return v.P()
u=this.y
if(typeof u!=="number")return H.p(u)
t=this.cy
if(typeof t!=="number")return H.p(t)
x.sa_(0,-v*u+t)
t=this.b
u=w.b
if(typeof u!=="number")return u.P()
v=this.x
if(typeof v!=="number")return H.p(v)
x=this.db
if(typeof x!=="number")return H.p(x)
t.sa_(0,-u*v+x)
this.b.sV(0)
this.c.sV(0)
y=y.M(0,a.z)
this.dx=this.al(new V.W(y.a,y.b).j(0,2).w(0,z.ga4()))}this.ae()},"$1","gfO",4,0,2],
iR:[function(a){var z,y,x
H.f(a,"$isu")
if(!this.cx)return
this.cx=!1
if(this.ch)return
z=this.dx
if(z.F(z)>0.0001){z=this.c
y=this.dx.a
if(typeof y!=="number")return y.P()
x=this.y
if(typeof x!=="number")return H.p(x)
z.sV(-y*10*x)
x=this.b
y=this.dx.b
if(typeof y!=="number")return y.P()
z=this.x
if(typeof z!=="number")return H.p(z)
x.sV(-y*10*z)
this.ae()}},"$1","gfN",4,0,2],
aq:function(a,b,c){var z,y,x
z=this.dy
y=b.e
if(typeof z!=="number")return z.O()
if(z<y){this.dy=y
x=b.y
this.c.ap(0,x)
this.b.ap(0,x)
this.fr=V.em(this.b.d).j(0,V.en(this.c.d))}return this.fr},
$isa8:1},k2:{"^":"b;0a,0b,0c,0d,0e,0f,0r",
gB:function(){var z=this.r
if(z==null){z=D.Q()
this.r=z}return z},
K:function(a){var z=this.r
if(!(z==null))z.G(a)},
aX:function(a){var z,y,x
if(this.a!=null)return!1
this.a=a
z=a.c
y=z.e
if(y==null){y=D.Q()
z.e=y
z=y}else z=y
y=H.h(this.gf0(),{func:1,ret:-1,args:[D.u]})
C.a.h(z.a,y)
z=this.a.d
x=z.e
if(x==null){x=D.Q()
z.e=x
z=x}else z=x
C.a.h(z.a,y)
return!0},
ip:[function(a){var z,y,x,w
H.f(a,"$isu")
if(!J.P(this.b,this.a.b.c))return
H.j(a,"$isd4")
z=this.d
y=a.x.b
x=this.c
if(typeof y!=="number")return y.j()
w=z+y*x
if(z!==w){this.d=w
z=new D.H("zoom",z,w,this,[P.q])
z.b=!0
this.K(z)}},"$1","gf0",4,0,2],
aq:function(a,b,c){var z,y,x
z=this.e
y=b.e
if(z<y){this.e=y
x=Math.pow(10,this.d)
this.f=V.ep(x,x,x,1)}return this.f},
$isa8:1}}],["","",,M,{"^":"",hJ:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x",
aF:[function(a){var z
H.f(a,"$isu")
z=this.x
if(!(z==null))z.G(a)},function(){return this.aF(null)},"ij","$1","$0","gak",0,2,1],
iw:[function(a,b){var z,y,x,w,v,u,t,s
z=E.aK
H.w(b,"$isk",[z],"$ask")
for(y=b.length,x=this.gak(),w={func:1,ret:-1,args:[D.u]},v=[w],u=0;u<b.length;b.length===y||(0,H.A)(b),++u){t=b[u]
if(t!=null){if(t.ga2()==null){s=new D.b7()
s.a=H.e([],v)
s.c=0
t.sa2(s)}s=t.ga2()
s.toString
H.h(x,w)
C.a.h(s.a,x)}}z=new D.cn(a,b,this,[z])
z.b=!0
this.aF(z)},"$2","gf7",8,0,8],
ix:[function(a,b){var z,y,x,w,v,u,t,s
z=E.aK
H.w(b,"$isk",[z],"$ask")
for(y=b.length,x=this.gak(),w={func:1,ret:-1,args:[D.u]},v=[w],u=0;u<b.length;b.length===y||(0,H.A)(b),++u){t=b[u]
if(t!=null){if(t.ga2()==null){s=new D.b7()
s.a=H.e([],v)
s.c=0
t.sa2(s)}s=t.ga2()
s.toString
H.h(x,w)
C.a.S(s.a,x)}}z=new D.co(a,b,this,[z])
z.b=!0
this.aF(z)},"$2","gf8",8,0,8],
sea:function(a){var z,y,x
z=this.c
if(z==null?a!=null:z!==a){if(z!=null){z=z.gB()
z.toString
y=H.h(this.gak(),{func:1,ret:-1,args:[D.u]})
C.a.S(z.a,y)}x=this.c
this.c=a
if(a!=null){z=a.gB()
z.toString
y=H.h(this.gak(),{func:1,ret:-1,args:[D.u]})
C.a.h(z.a,y)}z=new D.H("technique",x,this.c,this,[O.de])
z.b=!0
this.aF(z)}},
gB:function(){var z=this.x
if(z==null){z=D.Q()
this.x=z}return z},
aS:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
a.e6(this.c)
z=this.b
z.toString
a.a.bindFramebuffer(36160,null)
a.a.enable(2884)
a.a.enable(2929)
a.a.depthFunc(513)
y=a.a
x=y.drawingBufferWidth
w=y.drawingBufferHeight
v=z.r
if(typeof x!=="number")return H.p(x)
u=C.d.ab(v.a*x)
if(typeof w!=="number")return H.p(w)
t=C.d.ab(v.b*w)
s=C.d.ab(v.c*x)
a.c=s
v=C.d.ab(v.d*w)
a.d=v
y.viewport(u,t,s,v)
a.a.clearDepth(z.c)
y=a.a
z=z.a
y.clearColor(z.a,z.b,z.c,z.d)
a.a.clear(16640)
z=this.a
y=a.c
v=a.d
s=a.cy
r=z.b
q=z.c
p=z.d
o=p-q
n=1/Math.tan(r*0.5)
s.e5(V.aB(-n/(y/v),0,0,0,0,n,0,0,0,0,p/o,-p*q/o,0,0,1,0))
y=$.eu
if(y==null){y=new V.E(0,0,-1)
m=y.w(0,Math.sqrt(y.F(y)))
y=new V.E(0,1,0).aw(m)
l=y.w(0,Math.sqrt(y.F(y)))
k=m.aw(l)
j=new V.E(0,0,0)
y=V.aB(l.a,k.a,m.a,l.P(0).F(j),l.b,k.b,m.b,k.P(0).F(j),l.c,k.c,m.c,m.P(0).F(j),0,0,0,1)
$.eu=y
i=y}else i=y
y=z.a
if(y!=null){h=y.aq(0,a,z)
if(h!=null)i=h.j(0,i)}a.db.e5(i)
z=this.c
if(z!=null)z.ap(0,a)
for(z=this.d.a,z=new J.az(z,z.length,0,[H.y(z,0)]);z.I();)z.d.ap(0,a)
for(z=this.d.a,z=new J.az(z,z.length,0,[H.y(z,0)]);z.I();)z.d.aS(a)
this.a.toString
a.cy.cA()
a.db.cA()
this.b.toString
a.e4()},
$isou:1}}],["","",,A,{"^":"",dL:{"^":"b;a,b,c"},hg:{"^":"b;a",
k:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(w.b===b)return w}return},
hv:function(){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x){w=z[x]
w.a.enableVertexAttribArray(w.c)}},
hu:function(){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x){w=z[x]
w.a.disableVertexAttribArray(w.c)}}},iq:{"^":"eB;0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,0r2,0rx,0ry,0x1,0x2,0y1,0y2,0aO,0ay,0aP,0bs,0dq,0dr,0bt,0bu,0ds,0dt,0bv,0bw,0du,0dv,0bx,0dw,0dz,0by,0dA,0dB,0bz,0bA,0bB,0dC,0dD,0bC,0bD,0dE,0dF,0bE,0dG,0ck,0dH,0cl,0dI,0cm,0dJ,0cn,0dK,0co,0dL,0cp,a,b,0c,0d,0e,0f,0r",
es:function(a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
this.x=a2
z=new P.ao("")
y=a2.fx
if(y){z.a="uniform mat4 objMat;\n"
x="uniform mat4 objMat;\n"}else x=""
w=a2.fy
if(w){x+="uniform mat4 viewObjMat;\n"
z.a=x}x+="uniform mat4 projViewObjMat;\n"
z.a=x
x+="\n"
z.a=x
x+="attribute vec3 posAttr;\n"
z.a=x
v=a2.r1
if(v){x+="attribute vec3 normAttr;\n"
z.a=x}u=a2.r2
if(u){x+="attribute vec3 binmAttr;\n"
z.a=x}z.a=x+"\n"
a2.fS(z)
a2.fZ(z)
a2.fT(z)
a2.h6(z)
a2.h7(z)
a2.h0(z)
a2.hb(z)
x=z.a+="vec4 getPos()\n"
x+="{\n"
z.a=x
t=a2.x1
x+="   return projViewObjMat*vec4("+(t?"bendPos":"posAttr")+", 1.0);\n"
z.a=x
x+="}\n"
z.a=x
x+="\n"
z.a=x
x+="void main()\n"
z.a=x
x+="{\n"
z.a=x
if(t){x+="   setupBendData();\n"
z.a=x}if(v){x+="   normalVec = getNorm();\n"
z.a=x}if(u){x+="   binormalVec = getBinm();\n"
z.a=x}if(a2.rx){x+="   txt2D = getTxt2D();\n"
z.a=x}if(a2.ry){x+="   txtCube = getTxtCube();\n"
z.a=x}if(a2.k3){x+="   objPos = getObjPos();\n"
z.a=x}if(a2.k4){x+="   viewPos = getViewPos();\n"
z.a=x}x+="   gl_Position = getPos();\n"
z.a=x
x+="}\n"
z.a=x
x+="\n"
z.a=x
v=this.x
z=new P.ao("")
z.a="precision mediump float;\n"
z.a="precision mediump float;\n\n"
u=v.r1
if(u){z.a="precision mediump float;\n\nvarying vec3 normalVec;\n"
t="precision mediump float;\n\nvarying vec3 normalVec;\n"}else t="precision mediump float;\n\n"
if(v.r2){t+="varying vec3 binormalVec;\n"
z.a=t}if(v.rx){t+="varying vec2 txt2D;\n"
z.a=t}if(v.ry){t+="varying vec3 txtCube;\n"
z.a=t}if(v.k3){t+="varying vec3 objPos;\n"
z.a=t}if(v.k4){t+="varying vec3 viewPos;\n"
z.a=t}t+="\n"
z.a=t
s=v.y2
if(s){t+="uniform mat4 colorMat;\n"
z.a=t}if(v.fr){t+="uniform mat4 invViewMat;\n"
z.a=t}z.a=t+"\n"
v.fW(z)
v.fR(z)
v.fU(z)
v.fX(z)
v.h4(z)
t=v.dy
if(t){r=z.a+="// === Enviromental ===\n"
r+="\n"
z.a=r
r+="uniform samplerCube envSampler;\n"
z.a=r
r+="uniform int nullEnvTxt;\n"
z.a=r
z.a=r+"\n"
v.h2(z)
v.h3(z)}v.h_(z)
r=z.a+="// === Alpha ===\n"
r+="\n"
z.a=r
q=v.y
if(q!==C.c){r+="uniform float alpha;\n"
z.a=r
if(q!==C.i){r+="uniform int nullAlphaTxt;\n"
z.a=r
if(q===C.e){r+="uniform sampler2D alphaTxt;\n"
z.a=r}else if(q===C.f){r+="uniform samplerCube alphaTxt;\n"
z.a=r}}r+="\n"
z.a=r}r+="float alphaValue()\n"
z.a=r
r+="{\n"
z.a=r
switch(q){case C.c:r+="   return 1.0;\n"
z.a=r
break
case C.i:r+="   return alpha;\n"
z.a=r
break
case C.e:r+="   if(nullAlphaTxt > 0) return alpha;\n"
z.a=r
r+="   float a = alpha*texture2D(alphaTxt, txt2D).a;\n"
z.a=r
r+="   if (a <= 0.000001) discard;\n"
z.a=r
r+="   return a;\n"
z.a=r
break
case C.f:r+="   if(nullAlphaTxt > 0) return alpha;\n"
z.a=r
r+="   float a = alpha*textureCube(alphaTxt, txtCube).a;\n"
z.a=r
r+="   if (a <= 0.000001) discard;\n"
z.a=r
r+="   return a;\n"
z.a=r
break}r+="}\n"
z.a=r
r+="\n"
z.a=r
q=v.k2
if(q){r+="// === Lighting ===\n"
z.a=r
r+="\n"
z.a=r
r+="vec3 lightValue(vec3 norm, vec3 litClr, vec3 litVec)\n"
z.a=r
r+="{\n"
z.a=r
z.a=r+"   if ((litClr.r < 0.001) && (litClr.g < 0.001) && (litClr.b < 0.001)) return litClr;\n"
p=H.e([],[P.i])
if(v.b!==C.c)C.a.h(p,"ambient()")
if(v.c!==C.c)C.a.h(p,"diffuse(norm, litVec)")
if(v.d!==C.c)C.a.h(p,"invDiffuse(norm, litVec)")
if(v.e!==C.c)C.a.h(p,"specular(norm, litVec)")
r=z.a+="   return litClr*("+C.a.E(p," + ")+");\n"
r+="}\n"
z.a=r
z.a=r+"\n"
v.fV(z)
v.h1(z)
v.h5(z)
v.h8(z)
v.h9(z)
v.ha(z)
v.fY(z)}r=z.a+="// === Main ===\n"
r+="\n"
z.a=r
r+="void main()\n"
z.a=r
r+="{\n"
z.a=r
r+="   float alpha = alphaValue();\n"
z.a=r
if(u){u=r+"   vec3 norm = normal();\n"
z.a=u}else u=r
if(t)z.a=u+"   vec3 refl = reflect(normalize(viewPos), norm);\n"
o=H.e([],[P.i])
if(q){z.a+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
C.a.h(o,"lightAccum")
if(v.c!==C.c)z.a+="   setDiffuseColor();\n"
if(v.d!==C.c)z.a+="   setInvDiffuseColor();\n"
if(v.e!==C.c)z.a+="   setSpecularColor();\n"
if(v.z>0)z.a+="   lightAccum += allDirLightValues(norm);\n"
if(v.Q>0)z.a+="   lightAccum += allPointLightValues(norm);\n"
if(v.ch>0)z.a+="   lightAccum += allSpotLightValues(norm);\n"
if(v.cx>0)z.a+="   lightAccum += allTxtDirLightValues(norm);\n"
if(v.cy>0)z.a+="   lightAccum += allTxtPointLightValues(norm);\n"
if(v.db>0)z.a+="   lightAccum += allTxtSpotLightValues(norm);\n"
if(v.dx<=0)z.a+="   lightAccum += nonLightValues(norm);\n"}if(v.a!==C.c)C.a.h(o,"emission()")
if(v.r!==C.c)C.a.h(o,"reflect(refl)")
if(v.x!==C.c)C.a.h(o,"refract(refl)")
if(o.length<=0)C.a.h(o,"vec3(0.0, 0.0, 0.0)")
n="vec4("+C.a.E(o," + ")+", alpha);"
v=z.a
if(s){v+="   gl_FragColor = colorMat*"+n+"\n"
z.a=v}else{v+="   gl_FragColor = "+n+"\n"
z.a=v}v+="}\n"
z.a=v
this.c=this.d1(x.charCodeAt(0)==0?x:x,35633)
this.d=this.d1(v.charCodeAt(0)==0?v:v,35632)
v=this.a
x=v.createProgram()
this.e=x
v.attachShader(x,this.c)
v.attachShader(this.e,this.d)
v.linkProgram(this.e)
if(!H.fP(v.getProgramParameter(this.e,35714))){m=v.getProgramInfoLog(this.e)
v.deleteProgram(this.e)
H.t(P.v("Failed to link shader: "+H.l(m)))}this.fI()
this.fK()
this.y=this.f.k(0,"posAttr")
this.Q=this.f.k(0,"normAttr")
this.z=this.f.k(0,"binmAttr")
this.ch=this.f.k(0,"txt2DAttr")
this.cx=this.f.k(0,"txtCubeAttr")
this.cy=this.f.k(0,"bendAttr")
if(a2.fr)this.fy=H.j(this.r.n(0,"invViewMat"),"$isaN")
if(y)this.db=H.j(this.r.n(0,"objMat"),"$isaN")
if(w)this.dx=H.j(this.r.n(0,"viewObjMat"),"$isaN")
this.fr=H.j(this.r.n(0,"projViewObjMat"),"$isaN")
if(a2.x2)this.go=H.j(this.r.n(0,"txt2DMat"),"$isdi")
if(a2.y1)this.id=H.j(this.r.n(0,"txtCubeMat"),"$isaN")
if(a2.y2)this.k1=H.j(this.r.n(0,"colorMat"),"$isaN")
this.k3=H.e([],[A.aN])
y=a2.aO
if(y>0){this.k2=H.f(this.r.n(0,"bendMatCount"),"$isN")
for(l=0;l<y;++l){x=this.k3
w=this.r
v="bendValues["+l+"].mat"
k=w.k(0,v)
if(k==null)H.t(P.v("Required uniform value, "+v+", was not defined or used in shader."));(x&&C.a).h(x,H.j(k,"$isaN"))}}y=a2.a
if(y!==C.c){this.k4=H.j(this.r.n(0,"emissionClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.r1=H.j(this.r.n(0,"emissionTxt"),"$isap")
this.rx=H.j(this.r.n(0,"nullEmissionTxt"),"$isN")
break
case C.f:this.r2=H.j(this.r.n(0,"emissionTxt"),"$isaq")
this.rx=H.j(this.r.n(0,"nullEmissionTxt"),"$isN")
break}}y=a2.b
if(y!==C.c){this.ry=H.j(this.r.n(0,"ambientClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.x1=H.j(this.r.n(0,"ambientTxt"),"$isap")
this.y1=H.j(this.r.n(0,"nullAmbientTxt"),"$isN")
break
case C.f:this.x2=H.j(this.r.n(0,"ambientTxt"),"$isaq")
this.y1=H.j(this.r.n(0,"nullAmbientTxt"),"$isN")
break}}y=a2.c
if(y!==C.c){this.y2=H.j(this.r.n(0,"diffuseClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.aO=H.j(this.r.n(0,"diffuseTxt"),"$isap")
this.aP=H.j(this.r.n(0,"nullDiffuseTxt"),"$isN")
break
case C.f:this.ay=H.j(this.r.n(0,"diffuseTxt"),"$isaq")
this.aP=H.j(this.r.n(0,"nullDiffuseTxt"),"$isN")
break}}y=a2.d
if(y!==C.c){this.bs=H.j(this.r.n(0,"invDiffuseClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.dq=H.j(this.r.n(0,"invDiffuseTxt"),"$isap")
this.bt=H.j(this.r.n(0,"nullInvDiffuseTxt"),"$isN")
break
case C.f:this.dr=H.j(this.r.n(0,"invDiffuseTxt"),"$isaq")
this.bt=H.j(this.r.n(0,"nullInvDiffuseTxt"),"$isN")
break}}y=a2.e
if(y!==C.c){this.bw=H.j(this.r.n(0,"shininess"),"$isa_")
this.bu=H.j(this.r.n(0,"specularClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.ds=H.j(this.r.n(0,"specularTxt"),"$isap")
this.bv=H.j(this.r.n(0,"nullSpecularTxt"),"$isN")
break
case C.f:this.dt=H.j(this.r.n(0,"specularTxt"),"$isaq")
this.bv=H.j(this.r.n(0,"nullSpecularTxt"),"$isN")
break}}switch(a2.f){case C.c:break
case C.i:break
case C.e:this.du=H.j(this.r.n(0,"bumpTxt"),"$isap")
this.bx=H.j(this.r.n(0,"nullBumpTxt"),"$isN")
break
case C.f:this.dv=H.j(this.r.n(0,"bumpTxt"),"$isaq")
this.bx=H.j(this.r.n(0,"nullBumpTxt"),"$isN")
break}if(a2.dy){this.dw=H.j(this.r.n(0,"envSampler"),"$isaq")
this.dz=H.j(this.r.n(0,"nullEnvTxt"),"$isN")
y=a2.r
if(y!==C.c){this.by=H.j(this.r.n(0,"reflectClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.dA=H.j(this.r.n(0,"reflectTxt"),"$isap")
this.bz=H.j(this.r.n(0,"nullReflectTxt"),"$isN")
break
case C.f:this.dB=H.j(this.r.n(0,"reflectTxt"),"$isaq")
this.bz=H.j(this.r.n(0,"nullReflectTxt"),"$isN")
break}}y=a2.x
if(y!==C.c){this.bA=H.j(this.r.n(0,"refraction"),"$isa_")
this.bB=H.j(this.r.n(0,"refractClr"),"$isL")
switch(y){case C.c:break
case C.i:break
case C.e:this.dC=H.j(this.r.n(0,"refractTxt"),"$isap")
this.bC=H.j(this.r.n(0,"nullRefractTxt"),"$isN")
break
case C.f:this.dD=H.j(this.r.n(0,"refractTxt"),"$isaq")
this.bC=H.j(this.r.n(0,"nullRefractTxt"),"$isN")
break}}}y=a2.y
if(y!==C.c){this.bD=H.j(this.r.n(0,"alpha"),"$isa_")
switch(y){case C.c:break
case C.i:break
case C.e:this.dE=H.j(this.r.n(0,"alphaTxt"),"$isap")
this.bE=H.j(this.r.n(0,"nullAlphaTxt"),"$isN")
break
case C.f:this.dF=H.j(this.r.n(0,"alphaTxt"),"$isaq")
this.bE=H.j(this.r.n(0,"nullAlphaTxt"),"$isN")
break}}this.ck=H.e([],[A.f0])
this.cl=H.e([],[A.f1])
this.cm=H.e([],[A.f2])
this.cn=H.e([],[A.f3])
this.co=H.e([],[A.f4])
this.cp=H.e([],[A.f5])
if(a2.k2){y=a2.z
if(y>0){this.dG=H.f(this.r.n(0,"dirLightCount"),"$isN")
for(l=0;l<y;++l){x=this.r
w="dirLights["+l+"].viewDir"
k=x.k(0,w)
if(k==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(k,"$isL")
x=this.r
w="dirLights["+l+"].color"
j=x.k(0,w)
if(j==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(j,"$isL")
x=this.ck;(x&&C.a).h(x,new A.f0(l,k,j))}}y=a2.Q
if(y>0){this.dH=H.f(this.r.n(0,"pntLightCount"),"$isN")
for(l=0;l<y;++l){x=this.r
w="pntLights["+l+"].point"
k=x.k(0,w)
if(k==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(k,"$isL")
x=this.r
w="pntLights["+l+"].viewPnt"
j=x.k(0,w)
if(j==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(j,"$isL")
x=this.r
w="pntLights["+l+"].color"
i=x.k(0,w)
if(i==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(i,"$isL")
x=this.r
w="pntLights["+l+"].att0"
h=x.k(0,w)
if(h==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(h,"$isa_")
x=this.r
w="pntLights["+l+"].att1"
g=x.k(0,w)
if(g==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(g,"$isa_")
x=this.r
w="pntLights["+l+"].att2"
f=x.k(0,w)
if(f==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(f,"$isa_")
x=this.cl;(x&&C.a).h(x,new A.f1(l,k,j,i,h,g,f))}}y=a2.ch
if(y>0){this.dI=H.f(this.r.n(0,"spotLightCount"),"$isN")
for(l=0;l<y;++l){x=this.r
w="spotLights["+l+"].objPnt"
k=x.k(0,w)
if(k==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(k,"$isL")
x=this.r
w="spotLights["+l+"].objDir"
j=x.k(0,w)
if(j==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(j,"$isL")
x=this.r
w="spotLights["+l+"].viewPnt"
i=x.k(0,w)
if(i==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(i,"$isL")
x=this.r
w="spotLights["+l+"].color"
h=x.k(0,w)
if(h==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(h,"$isL")
x=this.r
w="spotLights["+l+"].cutoff"
g=x.k(0,w)
if(g==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(g,"$isa_")
x=this.r
w="spotLights["+l+"].coneAngle"
f=x.k(0,w)
if(f==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(f,"$isa_")
x=this.r
w="spotLights["+l+"].att0"
e=x.k(0,w)
if(e==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(e,"$isa_")
x=this.r
w="spotLights["+l+"].att1"
d=x.k(0,w)
if(d==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(d,"$isa_")
x=this.r
w="spotLights["+l+"].att2"
c=x.k(0,w)
if(c==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(c,"$isa_")
x=this.cm;(x&&C.a).h(x,new A.f2(l,k,j,i,h,g,f,e,d,c))}}y=a2.cx
if(y>0){this.dJ=H.f(this.r.n(0,"txtDirLightCount"),"$isN")
for(l=0;l<y;++l){x=this.r
w="txtDirLights["+l+"].objUp"
k=x.k(0,w)
if(k==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(k,"$isL")
x=this.r
w="txtDirLights["+l+"].objRight"
j=x.k(0,w)
if(j==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(j,"$isL")
x=this.r
w="txtDirLights["+l+"].objDir"
i=x.k(0,w)
if(i==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(i,"$isL")
x=this.r
w="txtDirLights["+l+"].viewDir"
h=x.k(0,w)
if(h==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(h,"$isL")
x=this.r
w="txtDirLights["+l+"].color"
g=x.k(0,w)
if(g==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(g,"$isL")
x=this.r
w="txtDirLights["+l+"].nullTxt"
f=x.k(0,w)
if(f==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(f,"$isN")
x=this.r
w="txtDirLightsTxt2D"+l
e=x.k(0,w)
if(e==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(e,"$isap")
x=this.cn;(x&&C.a).h(x,new A.f3(l,k,j,i,h,g,e,f))}}y=a2.cy
if(y>0){this.dK=H.f(this.r.n(0,"txtPntLightCount"),"$isN")
for(l=0;l<y;++l){x=this.r
w="txtPntLights["+l+"].point"
k=x.k(0,w)
if(k==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(k,"$isL")
x=this.r
w="txtPntLights["+l+"].viewPnt"
j=x.k(0,w)
if(j==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(j,"$isL")
x=this.r
w="txtPntLights["+l+"].invViewRotMat"
i=x.k(0,w)
if(i==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(i,"$isdi")
x=this.r
w="txtPntLights["+l+"].color"
h=x.k(0,w)
if(h==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(h,"$isL")
x=this.r
w="txtPntLights["+l+"].nullTxt"
g=x.k(0,w)
if(g==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(g,"$isN")
x=this.r
w="txtPntLights["+l+"].att0"
f=x.k(0,w)
if(f==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(f,"$isa_")
x=this.r
w="txtPntLights["+l+"].att1"
e=x.k(0,w)
if(e==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(e,"$isa_")
x=this.r
w="txtPntLights["+l+"].att2"
d=x.k(0,w)
if(d==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(d,"$isa_")
x=this.r
w="txtPntLightsTxtCube"+l
c=x.k(0,w)
if(c==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(c,"$isaq")
x=this.co;(x&&C.a).h(x,new A.f4(l,k,j,i,h,c,g,f,e,d))}}y=a2.db
if(y>0){this.dL=H.f(this.r.n(0,"txtSpotLightCount"),"$isN")
for(l=0;l<y;++l){x=this.r
w="txtSpotLights["+l+"].objPnt"
k=x.k(0,w)
if(k==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(k,"$isL")
x=this.r
w="txtSpotLights["+l+"].objDir"
j=x.k(0,w)
if(j==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(j,"$isL")
x=this.r
w="txtSpotLights["+l+"].objUp"
i=x.k(0,w)
if(i==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(i,"$isL")
x=this.r
w="txtSpotLights["+l+"].objRight"
h=x.k(0,w)
if(h==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(h,"$isL")
x=this.r
w="txtSpotLights["+l+"].viewPnt"
g=x.k(0,w)
if(g==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(g,"$isL")
x=this.r
w="txtSpotLights["+l+"].nullTxt"
f=x.k(0,w)
if(f==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(f,"$isN")
x=this.r
w="txtSpotLights["+l+"].color"
e=x.k(0,w)
if(e==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(e,"$isL")
x=this.r
w="txtSpotLights["+l+"].tuScalar"
d=x.k(0,w)
if(d==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(d,"$isa_")
x=this.r
w="txtSpotLights["+l+"].tvScalar"
c=x.k(0,w)
if(c==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(c,"$isa_")
x=this.r
w="txtSpotLights["+l+"].att0"
b=x.k(0,w)
if(b==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(b,"$isa_")
x=this.r
w="txtSpotLights["+l+"].att1"
a=x.k(0,w)
if(a==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(a,"$isa_")
x=this.r
w="txtSpotLights["+l+"].att2"
a0=x.k(0,w)
if(a0==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(a0,"$isa_")
x=this.r
w="txtSpotLightsTxt2D"+l
a1=x.k(0,w)
if(a1==null)H.t(P.v("Required uniform value, "+w+", was not defined or used in shader."))
H.j(a1,"$isap")
x=this.cp;(x&&C.a).h(x,new A.f5(l,k,j,i,h,g,a1,f,e,d,c,b,a,a0))}}}},
ag:function(a,b,c){b.a.uniform1i(b.d,1)},
a7:function(a,b,c){b.a.uniform1i(b.d,1)},
p:{
ip:function(a,b){var z,y
z=a.ay
y=new A.iq(b,z)
y.ew(b,z)
y.es(a,b)
return y}}},it:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,aO,ay,aP",
fS:function(a){var z,y,x
if(!this.x1)return
z=a.a+="struct BendingValue\n"
z+="{\n"
a.a=z
z+="   mat4 mat;\n"
a.a=z
z+="};\n"
a.a=z
a.a=z+"uniform int bendMatCount;\n"
z=a.a+="uniform BendingValue bendValues["+this.aO+"];\n"
z+="attribute vec4 bendAttr;\n"
a.a=z
z+="\n"
a.a=z
z+="float weightSum;\n"
a.a=z
z+="vec3 bendPos;\n"
a.a=z
y=this.r1
if(y){z+="vec3 bendNorm;\n"
a.a=z}x=this.r2
if(x){z+="vec3 bendBinm;\n"
a.a=z}z+="\n"
a.a=z
z+="void adjustBend(float bendVal)\n"
a.a=z
z+="{\n"
a.a=z
z+="   if(bendVal >= 0.0)\n"
a.a=z
z+="   {\n"
a.a=z
z+="      int index = int(floor((bendVal + 0.5)*0.5));\n"
a.a=z
z+="      if(index < bendMatCount)\n"
a.a=z
z+="      {\n"
a.a=z
z+="         float weight = clamp(bendVal - float(index)*2.0, 0.0, 1.0);\n"
a.a=z
z+="         mat4 m = bendValues[index].mat;\n"
a.a=z
z+="         weightSum += weight;\n"
a.a=z
z+="         bendPos += (m*vec4(posAttr, 1.0)).xyz*weight;\n"
a.a=z
if(y){z+="         bendNorm += (m*vec4(normAttr, 0.0)).xyz*weight;\n"
a.a=z}if(x){z+="         bendBinm += (m*vec4(binmAttr, 0.0)).xyz*weight;\n"
a.a=z}z+="      }\n"
a.a=z
z+="   }\n"
a.a=z
z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="void setupBendData()\n"
a.a=z
z+="{\n"
a.a=z
z+="   bendPos = vec3(0.0, 0.0, 0.0);\n"
a.a=z
if(y){z+="   bendNorm = vec3(0.0, 0.0, 0.0);\n"
a.a=z}if(x){z+="   bendBinm = vec3(0.0, 0.0, 0.0);\n"
a.a=z}z+="   weightSum = 0.0;\n"
a.a=z
z+="   adjustBend(bendAttr.x);\n"
a.a=z
z+="   adjustBend(bendAttr.y);\n"
a.a=z
z+="   adjustBend(bendAttr.z);\n"
a.a=z
z+="   adjustBend(bendAttr.w);\n"
a.a=z
z+="   if(weightSum < 1.0)\n"
a.a=z
z+="   {\n"
a.a=z
z+="      float weight = 1.0 - weightSum;\n"
a.a=z
z+="      bendPos += posAttr*weight;\n"
a.a=z
if(y){z+="      bendNorm += normAttr*weight;\n"
a.a=z}if(x){z+="      bendBinm += binmAttr*weight;\n"
a.a=z}z+="   }\n"
a.a=z
z+="   else\n"
a.a=z
z+="   {\n"
a.a=z
z+="      bendPos = bendPos/weightSum;\n"
a.a=z
z+="   }\n"
a.a=z
if(y){z+="   bendNorm = normalize(bendNorm);\n"
a.a=z}if(x){z+="   bendBinm = normalize(bendBinm);\n"
a.a=z}z+="}\n"
a.a=z
a.a=z+"\n"},
fZ:function(a){var z
if(!this.r1)return
z=a.a+="varying vec3 normalVec;\n"
z+="\n"
a.a=z
z+="vec3 getNorm()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return normalize((viewObjMat*vec4("+(this.x1?"bendNorm":"normAttr")+", 0.0)).xyz);\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
fT:function(a){var z
if(!this.r2)return
z=a.a+="varying vec3 binormalVec;\n"
z+="\n"
a.a=z
z+="vec3 getBinm()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return normalize((viewObjMat*vec4("+(this.x1?"bendBinm":"binmAttr")+", 0.0)).xyz);\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h6:function(a){var z,y
if(!this.rx)return
z=this.x2
if(z)a.a+="uniform mat3 txt2DMat;\n"
y=a.a+="attribute vec2 txt2DAttr;\n"
y+="varying vec2 txt2D;\n"
a.a=y
y+="\n"
a.a=y
y+="vec2 getTxt2D()\n"
a.a=y
y+="{\n"
a.a=y
if(z){z=y+"   return (txt2DMat*vec3(txt2DAttr, 1.0)).xy;\n"
a.a=z}else{z=y+"   return vec3(txt2DAttr, 1.0).xy;\n"
a.a=z}z+="}\n"
a.a=z
a.a=z+"\n"},
h7:function(a){var z,y
if(!this.ry)return
z=this.y1
if(z)a.a+="uniform mat4 txtCubeMat;\n"
y=a.a+="attribute vec3 txtCubeAttr;\n"
y+="varying vec3 txtCube;\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 getTxtCube()\n"
a.a=y
y+="{\n"
a.a=y
if(z){z=y+"   return (txtCubeMat*vec4(txtCubeAttr, 1.0)).xyz;\n"
a.a=z}else{z=y+"   return vec4(txtCubeAttr, 1.0).xyz;\n"
a.a=z}z+="}\n"
a.a=z
a.a=z+"\n"},
h0:function(a){var z
if(!this.k3)return
z=a.a+="varying vec3 objPos;\n"
z+="\n"
a.a=z
z+="vec3 getObjPos()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return (objMat*vec4("+(this.x1?"bendPos":"posAttr")+", 1.0)).xyz;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hb:function(a){var z
if(!this.k4)return
z=a.a+="varying vec3 viewPos;\n"
z+="\n"
a.a=z
z+="vec3 getViewPos()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return (viewObjMat*vec4("+(this.x1?"bendPos":"posAttr")+", 1.0)).xyz;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
at:function(a,b,c){var z
if(b===C.c)return
z=a.a+="uniform vec3 "+c+"Clr;\n"
if(b===C.i)return
if(0>=c.length)return H.d(c,0)
z+="uniform int null"+(c[0].toUpperCase()+C.b.aB(c,1))+"Txt;\n"
a.a=z
if(b===C.e)a.a=z+("uniform sampler2D "+c+"Txt;\n")
else if(b===C.f)a.a=z+("uniform samplerCube "+c+"Txt;\n")},
fW:function(a){var z,y
z=this.a
if(z===C.c)return
y=a.a+="// === Emission ===\n"
a.a=y+"\n"
this.at(a,z,"emission")
y=a.a+="\n"
y+="vec3 emission()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   return emissionClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullEmissionTxt > 0) return emissionClr;\n"
a.a=z
z+="   return emissionClr*texture2D(emissionTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullEmissionTxt > 0) return emissionClr;\n"
a.a=z
z+="   return emissionClr*textureCube(emissionTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
a.a=z+"\n"},
fR:function(a){var z,y
z=this.b
if(z===C.c)return
y=a.a+="// === Ambient ===\n"
a.a=y+"\n"
this.at(a,z,"ambient")
y=a.a+="\n"
y+="vec3 ambient()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   return ambientClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullAmbientTxt > 0) return ambientClr;\n"
a.a=z
z+="   return ambientClr*texture2D(ambientTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullAmbientTxt > 0) return ambientClr;\n"
a.a=z
z+="   return ambientClr*textureCube(ambientTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
a.a=z+"\n"},
fU:function(a){var z,y
z=this.c
if(z===C.c)return
y=a.a+="// === Diffuse ===\n"
a.a=y+"\n"
this.at(a,z,"diffuse")
y=a.a+="vec3 diffuseColor;\n"
y+="\n"
a.a=y
y+="void setDiffuseColor()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   diffuseColor = diffuseClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullDiffuseTxt > 0) diffuseColor = diffuseClr;\n"
a.a=z
z+="   else diffuseColor = diffuseClr*texture2D(diffuseTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullDiffuseTxt > 0) diffuseColor = diffuseClr;\n"
a.a=z
z+="   else diffuseColor = diffuseClr*textureCube(diffuseTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="vec3 diffuse(vec3 norm, vec3 litVec)\n"
a.a=z
z+="{\n"
a.a=z
z+="   float scalar = dot(norm, -litVec);\n"
a.a=z
z+="   if(scalar < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   return diffuseColor*scalar;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
fX:function(a){var z,y
z=this.d
if(z===C.c)return
y=a.a+="// === Inverse Diffuse ===\n"
a.a=y+"\n"
this.at(a,z,"invDiffuse")
y=a.a+="vec3 invDiffuseColor;\n"
y+="\n"
a.a=y
y+="void setInvDiffuseColor()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   invDiffuseColor = invDiffuseClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullInvDiffuseTxt > 0) invDiffuseColor = invDiffuseClr;\n"
a.a=z
z+="   else invDiffuseColor = invDiffuseClr*texture2D(invDiffuseTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullInvDiffuseTxt > 0) invDiffuseColor = invDiffuseClr;\n"
a.a=z
z+="   else invDiffuseColor = invDiffuseClr*textureCube(invDiffuseTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="vec3 invDiffuse(vec3 norm, vec3 litVec)\n"
a.a=z
z+="{\n"
a.a=z
z+="   float scalar = 1.0 - clamp(dot(norm, -litVec), 0.0, 1.0);\n"
a.a=z
z+="   if(scalar < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   return invDiffuseColor*scalar;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h4:function(a){var z,y
z=this.e
if(z===C.c)return
y=a.a+="// === Specular ===\n"
a.a=y+"\n"
this.at(a,z,"specular")
y=a.a+="uniform float shininess;\n"
y+="vec3 specularColor;\n"
a.a=y
y+="\n"
a.a=y
y+="void setSpecularColor()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   specularColor = specularClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullSpecularTxt > 0) specularColor = specularClr;\n"
a.a=z
z+="   else specularColor = specularClr*texture2D(specularTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullSpecularTxt > 0) specularColor = specularClr;\n"
a.a=z
z+="   else specularColor = specularClr*textureCube(specularTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="vec3 specular(vec3 norm, vec3 litVec)\n"
a.a=z
z+="{\n"
a.a=z
z+="   if(dot(norm, -litVec) < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 lightRef = normalize(reflect(litVec, norm));\n"
a.a=z
z+="   float scalar = dot(lightRef, -normalize(viewPos));\n"
a.a=z
z+="   if(scalar < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   return specularColor*pow(scalar, shininess);\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h_:function(a){var z,y
if(!this.r1)return
z=a.a+="// === Normal ===\n"
z+="\n"
a.a=z
y=this.f
switch(y){case C.c:break
case C.i:break
case C.e:z+="uniform sampler2D bumpTxt;\n"
a.a=z
z+="uniform int nullBumpTxt;\n"
a.a=z
z+="\n"
a.a=z
break
case C.f:z+="uniform samplerCube bumpTxt;\n"
a.a=z
z+="uniform int nullBumpTxt;\n"
a.a=z
z+="\n"
a.a=z
break}z+="vec3 normal()\n"
a.a=z
z+="{\n"
a.a=z
switch(y){case C.c:z+="   return normalize(normalVec);\n"
a.a=z
break
case C.i:z+="   return normalize(normalVec);\n"
a.a=z
break
case C.e:z+="   if(nullBumpTxt > 0) return normalVec;\n"
a.a=z
z+="   vec3 color = texture2D(bumpTxt, txt2D).rgb;\n"
a.a=z
z+="   vec3 n = normalize(normalVec);\n"
a.a=z
z+="   vec3 b = normalize(binormalVec);\n"
a.a=z
z+="   vec3 c = normalize(cross(b, n));\n"
a.a=z
z+="   b = cross(n, c);\n"
a.a=z
z+="   mat3 mat = mat3( b.x,  b.y,  b.z,\n"
a.a=z
z+="                   -c.x, -c.y, -c.z,\n"
a.a=z
z+="                    n.x,  n.y,  n.z);\n"
a.a=z
z+="   return mat * normalize(2.0*color - 1.0);\n"
a.a=z
break
case C.f:z+="   if(nullBumpTxt > 0) return normalVec;\n"
a.a=z
z+="   vec3 color = textureCube(bumpTxt, txtCube).rgb;\n"
a.a=z
z+="   vec3 n = normalize(normalVec);\n"
a.a=z
z+="   vec3 b = normalize(binormalVec);\n"
a.a=z
z+="   vec3 c = cross(b, n);\n"
a.a=z
z+="   b = cross(n, c);\n"
a.a=z
z+="   mat3 mat = mat3( b.x,  b.y,  b.z,\n"
a.a=z
z+="                   -c.x, -c.y, -c.z,\n"
a.a=z
z+="                    n.x,  n.y,  n.z);\n"
a.a=z
z+="   return mat * normalize(2.0*color - 1.0);\n"
a.a=z
break}z+="}\n"
a.a=z
a.a=z+"\n"},
h2:function(a){var z,y
z=this.r
if(z===C.c)return
y=a.a+="// === Reflection ===\n"
a.a=y+"\n"
this.at(a,z,"reflect")
y=a.a+="\n"
y+="vec3 reflect(vec3 refl)\n"
a.a=y
y+="{\n"
a.a=y
y+="   if(nullEnvTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   vec3 scalar = reflectClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullReflectTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = reflectClr*texture2D(reflectTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullReflectTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = reflectClr*textureCube(reflectTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="   vec3 invRefl = vec3(invViewMat*vec4(refl, 0.0));\n"
a.a=z
z+="   return scalar*textureCube(envSampler, invRefl).rgb;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h3:function(a){var z,y
z=this.x
if(z===C.c)return
y=a.a+="// === Refraction ===\n"
a.a=y+"\n"
this.at(a,z,"refract")
y=a.a+="uniform float refraction;\n"
y+="\n"
a.a=y
y+="vec3 refract(vec3 refl)\n"
a.a=y
y+="{\n"
a.a=y
y+="   if(nullEnvTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
switch(z){case C.c:z=y
break
case C.i:z=y+"   vec3 scalar = refractClr;\n"
a.a=z
break
case C.e:z=y+"   if(nullRefractTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = refractClr*texture2D(refractTxt, txt2D).rgb;\n"
a.a=z
break
case C.f:z=y+"   if(nullRefractTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = refractClr*textureCube(refractTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="   vec3 refr = mix(-refl, viewPos, refraction);\n"
a.a=z
z+="   vec3 invRefr = vec3(invViewMat*vec4(refr, 0.0));\n"
a.a=z
z+="   return scalar*textureCube(envSampler, invRefr).rgb;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
fV:function(a){var z,y
z=this.z
if(z<=0)return
y=a.a+="// === Directional Light ===\n"
y+="\n"
a.a=y
y+="struct DirLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 viewDir;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int dirLightCount;\n"
y=a.a+="uniform DirLight dirLights["+z+"];\n"
y+="\n"
a.a=y
y+="vec3 allDirLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
a.a=y+"   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
z=a.a+="   for(int i = 0; i < "+z+"; ++i)\n"
z+="   {\n"
a.a=z
z+="      if(i >= dirLightCount) break;\n"
a.a=z
z+="      DirLight lit = dirLights[i];\n"
a.a=z
z+="      lightAccum += lightValue(norm, lit.color, lit.viewDir);\n"
a.a=z
z+="   }\n"
a.a=z
z+="   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h1:function(a){var z,y
z=this.Q
if(z<=0)return
y=a.a+="// === Point Light ===\n"
y+="\n"
a.a=y
y+="struct PointLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 point;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int pntLightCount;\n"
y=a.a+="uniform PointLight pntLights["+z+"];\n"
y+="\n"
a.a=y
y+="vec3 pointLightValue(vec3 norm, PointLight lit)\n"
a.a=y
y+="{\n"
a.a=y
y+="   float dist = length(objPos - lit.point);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   return lightValue(norm, lit.color*attenuation, normalize(viewPos - lit.viewPnt));\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allPointLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
a.a=y+"   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
z=a.a+="   for(int i = 0; i < "+z+"; ++i)\n"
z+="   {\n"
a.a=z
z+="      if(i >= pntLightCount) break;\n"
a.a=z
z+="      lightAccum += pointLightValue(norm, pntLights[i]);\n"
a.a=z
z+="   }\n"
a.a=z
z+="   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h5:function(a){var z,y
z=this.ch
if(z<=0)return
y=a.a+="// === Spot Light ===\n"
y+="\n"
a.a=y
y+="struct SpotLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 objPnt;\n"
a.a=y
y+="   vec3 objDir;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   float cutoff;\n"
a.a=y
y+="   float coneAngle;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int spotLightCount;\n"
y=a.a+="uniform SpotLight spotLights["+z+"];\n"
y+="\n"
a.a=y
y+="vec3 spotLightValue(vec3 norm, SpotLight lit)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 dir = objPos - lit.objPnt;\n"
a.a=y
y+="   float dist = length(dir);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   float angle = acos(dot(normalize(dir), lit.objDir));\n"
a.a=y
y+="   float scale = (lit.cutoff-angle)/(lit.cutoff-lit.coneAngle);\n"
a.a=y
y+="   if(scale <= 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   if(scale > 1.0) scale = 1.0;\n"
a.a=y
y+="   return lightValue(norm, lit.color*attenuation*scale, normalize(viewPos - lit.viewPnt));\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allSpotLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
a.a=y+"   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
z=a.a+="   for(int i = 0; i < "+z+"; ++i)\n"
z+="   {\n"
a.a=z
z+="      if(i >= spotLightCount) break;\n"
a.a=z
z+="      lightAccum += spotLightValue(norm, spotLights[i]);\n"
a.a=z
z+="   }\n"
a.a=z
z+="   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h8:function(a){var z,y,x
z=this.cx
if(z<=0)return
y=a.a+="// === Texture Directional Light ===\n"
y+="\n"
a.a=y
y+="struct TexturedDirLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 objUp;\n"
a.a=y
y+="   vec3 objRight;\n"
a.a=y
y+="   vec3 objDir;\n"
a.a=y
y+="   vec3 viewDir;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   int nullTxt;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int txtDirLightCount;\n"
y=a.a+="uniform TexturedDirLight txtDirLights["+z+"];\n"
for(x=0;x<z;++x)y=a.a+="uniform sampler2D txtDirLightsTxt2D"+x+";\n"
y+="\n"
a.a=y
y+="vec3 txtDirLightValue(vec3 norm, TexturedDirLight lit, sampler2D txt2D)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   if(lit.nullTxt > 0) color = lit.color;\n"
a.a=y
y+="   else\n"
a.a=y
y+="   {\n"
a.a=y
y+="      vec3 offset = objPos + lit.objDir*dot(objPos, lit.objDir);\n"
a.a=y
y+="      float tu = dot(offset, lit.objUp);\n"
a.a=y
y+="      float tv = dot(offset, lit.objRight);\n"
a.a=y
y+="      color = lit.color*texture2D(txt2D, vec2(tu, tv)).xyz;\n"
a.a=y
y+="   }\n"
a.a=y
y+="   return lightValue(norm, color, lit.viewDir);\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allTxtDirLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
a.a=y
for(x=0;x<z;++x){a.a+="   if(txtDirLightCount <= "+x+") return lightAccum;\n"
y=a.a+="   lightAccum += txtDirLightValue(norm, txtDirLights["+x+"], txtDirLightsTxt2D"+x+");\n"}z=y+"   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
h9:function(a){var z,y,x
z=this.cy
if(z<=0)return
y=a.a+="// === Texture Point Light ===\n"
y+="\n"
a.a=y
y+="struct TexturedPointLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 point;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   mat3 invViewRotMat;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   int nullTxt;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int txtPntLightCount;\n"
y=a.a+="uniform TexturedPointLight txtPntLights["+z+"];\n"
for(x=0;x<z;++x)y=a.a+="uniform samplerCube txtPntLightsTxtCube"+x+";\n"
y+="\n"
a.a=y
y+="vec3 txtPointLightValue(vec3 norm, TexturedPointLight lit, samplerCube txtCube)\n"
a.a=y
y+="{\n"
a.a=y
y+="   float dist = length(objPos - lit.point);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   vec3 normDir = normalize(viewPos - lit.viewPnt);\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   if(lit.nullTxt > 0) color = lit.color;\n"
a.a=y
y+="   else\n"
a.a=y
y+="   {\n"
a.a=y
y+="      vec3 invNormDir = lit.invViewRotMat*normDir;\n"
a.a=y
y+="      color = lit.color*textureCube(txtCube, invNormDir).xyz;\n"
a.a=y
y+="   }\n"
a.a=y
y+="   return lightValue(norm, attenuation*color, normDir);\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allTxtPointLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
a.a=y
for(x=0;x<z;++x){a.a+="   if(txtPntLightCount <= "+x+") return lightAccum;\n"
y=a.a+="   lightAccum += txtPointLightValue(norm, txtPntLights["+x+"], txtPntLightsTxtCube"+x+");\n"}z=y+"   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
ha:function(a){var z,y,x
z=this.db
if(z<=0)return
y=a.a+="// === Texture Spot Light ===\n"
y+="\n"
a.a=y
y+="struct TexturedSpotLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 objPnt;\n"
a.a=y
y+="   vec3 objDir;\n"
a.a=y
y+="   vec3 objUp;\n"
a.a=y
y+="   vec3 objRight;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   int nullTxt;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   float tuScalar;\n"
a.a=y
y+="   float tvScalar;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int txtSpotLightCount;\n"
y=a.a+="uniform TexturedSpotLight txtSpotLights["+z+"];\n"
for(x=0;x<z;++x)y=a.a+="uniform sampler2D txtSpotLightsTxt2D"+x+";\n"
y+="\n"
a.a=y
y+="vec3 txtSpotLightValue(vec3 norm, TexturedSpotLight lit, sampler2D txt2D)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 dir = objPos - lit.objPnt;\n"
a.a=y
y+="   float dist = length(dir);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   vec3 normDir = normalize(dir);\n"
a.a=y
y+="   float zScale = dot(normDir, lit.objDir);\n"
a.a=y
y+="   if(zScale < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   normDir = normDir/zScale;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   if(lit.nullTxt > 0) color = lit.color;\n"
a.a=y
y+="   else\n"
a.a=y
y+="   {\n"
a.a=y
y+="      float tu = dot(normDir, lit.objUp)*lit.tuScalar+0.5;\n"
a.a=y
y+="      if((tu > 1.0) || (tu < 0.0)) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="      float tv = dot(normDir, lit.objRight)*lit.tvScalar+0.5;\n"
a.a=y
y+="      if((tv > 1.0) || (tv < 0.0)) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="      color = lit.color*texture2D(txt2D, vec2(tu, tv)).xyz;\n"
a.a=y
y+="   }\n"
a.a=y
y+="   return lightValue(norm, color*attenuation, normalize(viewPos - lit.viewPnt));\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allTxtSpotLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
a.a=y
for(x=0;x<z;++x){a.a+="   if(txtSpotLightCount <= "+x+") return lightAccum;\n"
y=a.a+="   lightAccum += txtSpotLightValue(norm, txtSpotLights["+x+"], txtSpotLightsTxt2D"+x+");\n"}z=y+"   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
fY:function(a){var z
if(this.dx>0)return
z=a.a+="// === No Lights ===\n"
z+="\n"
a.a=z
z+="vec3 nonLightValues(vec3 norm)\n"
a.a=z
z+="{\n"
a.a=z
z+="   return lightValue(norm, vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 1.0));\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
i:function(a){return this.ay}},f0:{"^":"b;a,b,c"},f3:{"^":"b;a,b,c,d,e,f,r,x"},f1:{"^":"b;a,b,c,d,e,f,r"},f4:{"^":"b;a,b,c,d,e,f,r,x,y,z"},f2:{"^":"b;a,b,c,d,e,f,r,x,y,z"},f5:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},eB:{"^":"cM;",
ew:function(a,b){this.c=null
this.d=null
this.e=null
this.f=null
this.r=null},
d1:function(a,b){var z,y,x
z=this.a
y=z.createShader(b)
z.shaderSource(y,a)
z.compileShader(y)
if(!H.fP(z.getShaderParameter(y,35713))){x=z.getShaderInfoLog(y)
z.deleteShader(y)
throw H.a(P.v("Error compiling shader '"+H.l(y)+"': "+H.l(x)))}return y},
fI:function(){var z,y,x,w,v,u
z=H.e([],[A.dL])
y=this.a
x=H.D(y.getProgramParameter(this.e,35721))
if(typeof x!=="number")return H.p(x)
w=0
for(;w<x;++w){v=y.getActiveAttrib(this.e,w)
u=y.getAttribLocation(this.e,v.name)
C.a.h(z,new A.dL(y,v.name,u))}this.f=new A.hg(z)},
fK:function(){var z,y,x,w,v,u
z=H.e([],[A.ad])
y=this.a
x=H.D(y.getProgramParameter(this.e,35718))
if(typeof x!=="number")return H.p(x)
w=0
for(;w<x;++w){v=y.getActiveUniform(this.e,w)
u=y.getUniformLocation(this.e,v.name)
C.a.h(z,this.hr(v.type,v.size,v.name,u))}this.r=new A.jM(z)},
aH:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.N(z,y,b,c)
else return A.dh(z,y,b,a,c)},
eO:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.ap(z,y,b,c)
else return A.dh(z,y,b,a,c)},
eP:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.aq(z,y,b,c)
else return A.dh(z,y,b,a,c)},
bm:function(a,b){return new P.fi(a+" uniform variables are unsupported by all browsers.\n"+("Please change the type of "+H.l(b)+"."))},
hr:function(a,b,c,d){switch(a){case 5120:return this.aH(b,c,d)
case 5121:return this.aH(b,c,d)
case 5122:return this.aH(b,c,d)
case 5123:return this.aH(b,c,d)
case 5124:return this.aH(b,c,d)
case 5125:return this.aH(b,c,d)
case 5126:return new A.a_(this.a,this.e,c,d)
case 35664:return new A.jH(this.a,this.e,c,d)
case 35665:return new A.L(this.a,this.e,c,d)
case 35666:return new A.jK(this.a,this.e,c,d)
case 35667:return new A.jI(this.a,this.e,c,d)
case 35668:return new A.jJ(this.a,this.e,c,d)
case 35669:return new A.jL(this.a,this.e,c,d)
case 35674:return new A.jO(this.a,this.e,c,d)
case 35675:return new A.di(this.a,this.e,c,d)
case 35676:return new A.aN(this.a,this.e,c,d)
case 35678:return this.eO(b,c,d)
case 35680:return this.eP(b,c,d)
case 35670:throw H.a(this.bm("BOOL",c))
case 35671:throw H.a(this.bm("BOOL_VEC2",c))
case 35672:throw H.a(this.bm("BOOL_VEC3",c))
case 35673:throw H.a(this.bm("BOOL_VEC4",c))
default:throw H.a(P.v("Unknown uniform variable type "+H.l(a)+" for "+H.l(c)+"."))}}},ch:{"^":"b;a,b",
i:function(a){return this.b}},ad:{"^":"b;"},jM:{"^":"b;a",
k:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(w.c===b)return w}return},
n:function(a,b){var z=this.k(0,b)
if(z==null)throw H.a(P.v("Required uniform value, "+b+", was not defined or used in shader."))
return z},
i:function(a){return this.N()},
hA:function(a){var z,y,x,w
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.A)(z),++w)x+=z[w].i(0)+a
return x},
N:function(){return this.hA("\n")}},N:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform1i: "+H.l(this.c)}},jI:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform2i: "+H.l(this.c)}},jJ:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform3i: "+H.l(this.c)}},jL:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform4i: "+H.l(this.c)}},jG:{"^":"ad;0e,0f,a,b,c,d",
i:function(a){return"Uniform1iv: "+H.l(this.c)},
p:{
dh:function(a,b,c,d,e){var z=new A.jG(a,b,c,e)
z.f=d
z.e=P.id(d,0,!1,P.m)
return z}}},a_:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform1f: "+H.l(this.c)}},jH:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform2f: "+H.l(this.c)}},L:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform3f: "+H.l(this.c)}},jK:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform4f: "+H.l(this.c)}},jO:{"^":"ad;a,b,c,d",
i:function(a){return"Uniform1Mat2 "+H.l(this.c)}},di:{"^":"ad;a,b,c,d",
aj:function(a){var z=new Float32Array(H.bq(H.w(a,"$isc",[P.q],"$asc")))
this.a.uniformMatrix3fv(this.d,!1,z)},
i:function(a){return"UniformMat3: "+H.l(this.c)}},aN:{"^":"ad;a,b,c,d",
aj:function(a){var z=new Float32Array(H.bq(H.w(a,"$isc",[P.q],"$asc")))
this.a.uniformMatrix4fv(this.d,!1,z)},
i:function(a){return"UniformMat4: "+H.l(this.c)}},ap:{"^":"ad;a,b,c,d",
i:function(a){return"UniformSampler2D: "+H.l(this.c)}},aq:{"^":"ad;a,b,c,d",
i:function(a){return"UniformSamplerCube: "+H.l(this.c)}}}],["","",,F,{"^":"",
dx:function(a,b,c,d){var z
H.h(c,{func:1,ret:-1,args:[F.ag,P.q,P.q]})
z=F.db()
F.bV(z,b,c,d,a,1,0,0,1)
F.bV(z,b,c,d,a,0,1,0,3)
F.bV(z,b,c,d,a,0,0,1,2)
F.bV(z,b,c,d,a,-1,0,0,0)
F.bV(z,b,c,d,a,0,-1,0,0)
F.bV(z,b,c,d,a,0,0,-1,3)
z.am()
return z},
cA:function(a){var z=a.a>0?1:0
if(a.b>0)z+=2
return(a.c>0?z+4:z)*2},
bV:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z={}
H.h(c,{func:1,ret:-1,args:[F.ag,P.q,P.q]})
y=f+g
x=y+h
w=g+h
v=h+f
u=new V.E(x,w+f,v+g)
z.a=u
t=f-g
s=g-h
r=h-f
q=new V.E(t+h,s+f,r+g)
z.b=q
p=new V.E(t-h,s-f,r-g)
z.c=p
o=new V.E(y-h,w-f,v-g)
z.d=o
if(x>0){z.d=q
z.b=o
x=q
y=o}else{x=o
y=q}for(v=x,x=y,y=u,w=p,n=0;n<i;++n,m=v,v=y,y=x,x=w,w=m){z.a=x
z.b=w
z.c=v
z.d=y}l=F.cA(y)
k=F.cA(z.b)
j=F.dF(d,e,new F.m8(z,F.cA(z.c),F.cA(z.d),k,l,c),b)
if(j!=null)a.b4(j)},
fS:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
H.h(d,{func:1,ret:P.q,args:[P.q]})
if(e<3)return
z=F.db()
y=b?-1:1
x=-6.283185307179586/e
w=H.e([],[F.ag])
v=z.a
u=new V.E(0,0,y)
u=u.w(0,Math.sqrt(u.F(u)))
C.a.h(w,v.hf(new V.bL(a,-1,-1,-1),new V.b3(1,1,1,1),new V.a3(0,0,c),new V.E(0,0,y),new V.V(0.5,0.5),u))
for(v=y*y,t=0;t<=e;++t){s=x*t
r=y*Math.sin(s)
q=Math.cos(s)
p=d.$1(t/e)
u=z.a
if(typeof p!=="number")return H.p(p)
o=new V.E(r,q,y).w(0,Math.sqrt(r*r+q*q+v))
if(r<0)n=0
else n=r>1?1:r
m=q<0
if(m)l=0
else l=q>1?1:q
if(m)m=0
else m=q>1?1:q
u.toString
k=F.c9(new V.bL(a,-1,-1,-1),null,new V.b3(n,l,m,1),new V.a3(r*p,q*p,c),new V.E(0,0,y),new V.V(r*0.5+0.5,q*0.5+0.5),o,null,0)
u.h(0,k)
C.a.h(w,k)}z.d.hd(w)
return z},
fQ:function(a,b,c,d,e,f){return F.ms(!0,c,d,new F.mr(a,f),e)},
ms:function(a,b,c,d,e){var z
H.h(d,{func:1,ret:P.q,args:[P.q,P.q]})
if(e<3)return
if(c<1)return
z=F.dF(c,e,new F.mu(d),null)
if(z==null)return
z.am()
z.c5()
if(b)z.b4(F.fS(3,!1,1,new F.mv(d),e))
z.b4(F.fS(1,!0,-1,new F.mw(d),e))
return z},
n1:function(a,b,c){var z,y
z={}
z.a=b
z.a=new F.n2()
y=F.dx(a,null,new F.n3(z),c)
y.c5()
return y},
h6:function(a,b,c,d){return F.fR(c,a,d,b,new F.n5())},
mL:function(a,b,c,d,e,f){return F.fR(d,a,e,b,new F.mM(f,c))},
fR:function(a,b,c,d,e){var z=F.dF(a,b,new F.mt(H.h(e,{func:1,ret:V.a3,args:[P.q]}),d,b,c),null)
if(z==null)return
z.am()
z.c5()
return z},
dF:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
H.h(c,{func:1,ret:-1,args:[F.ag,P.q,P.q]})
if(a<1)return
if(b<1)return
z=F.db()
y=H.e([],[F.ag])
for(x=0;x<=b;++x){w=x/b
v=z.a
if(w<0)u=0
else u=w>1?1:w
v.toString
t=F.c9(null,null,new V.b3(u,0,0,1),null,null,new V.V(w,1),null,null,0)
v.h(0,t)
c.$3(t,w,0)
C.a.h(y,t.cg(d))}for(x=1;x<=a;++x){s=x/a
for(v=s>1,u=s<0,r=1-s,q=0;q<=b;++q){w=q/b
p=z.a
if(w<0)o=0
else o=w>1?1:w
if(u)n=0
else n=v?1:s
if(u)m=0
else m=v?1:s
p.toString
t=F.c9(null,null,new V.b3(o,n,m,1),null,null,new V.V(w,r),null,null,0)
p.h(0,t)
c.$3(t,w,s)
C.a.h(y,t.cg(d))}}z.d.he(a+1,b+1,y)
return z},
m8:{"^":"n:9;a,b,c,d,e,f",
$3:function(a,b,c){var z,y,x
z=this.a
y=z.a.ct(z.b,b).ct(z.d.ct(z.c,b),c)
a.sa_(0,new V.a3(y.a,y.b,y.c))
a.seb(y.w(0,Math.sqrt(y.F(y))))
z=1-b
x=1-c
a.sdk(new V.bL(this.b+b*c,this.c+z*c,this.d+b*x,this.e+z*x))
z=this.f
if(z!=null)z.$3(a,b,c)}},
mr:{"^":"n:14;a,b",
$2:function(a,b){var z=this.a
return z+b*(this.b-z)}},
mu:{"^":"n:9;a",
$3:function(a,b,c){var z,y,x,w,v,u
z=6.283185307179586*b
y=Math.sin(z)
x=Math.cos(z)
w=-1+c*2
v=this.a.$2(b,c)
if(typeof v!=="number")return H.p(v)
y=-y*v
u=x*v
a.sa_(0,new V.a3(y,u,w))
u=new V.E(y,u,w)
a.seb(u.w(0,Math.sqrt(u.F(u))))
a.sdk(new V.bL(1-c,2+c,-1,-1))}},
mv:{"^":"n:15;a",
$1:function(a){return this.a.$2(a,1)}},
mw:{"^":"n:15;a",
$1:function(a){return this.a.$2(1-a,0)}},
n2:{"^":"n:14;",
$2:function(a,b){return 0}},
n3:{"^":"n:9;a",
$3:function(a,b,c){var z,y,x
z=this.a.a.$2(b,c)
if(typeof z!=="number")return H.p(z)
y=a.f
x=new V.E(y.a,y.b,y.c)
z=x.w(0,Math.sqrt(x.F(x))).j(0,1+z)
a.sa_(0,new V.a3(z.a,z.b,z.c))}},
n5:{"^":"n:22;",
$1:function(a){return new V.a3(Math.cos(a),Math.sin(a),0)}},
mM:{"^":"n:22;a,b",
$1:function(a){var z,y,x
z=this.a*a
y=2+Math.cos(z)
x=this.b*a
return new V.a3(y*Math.cos(x)/2,y*Math.sin(x)/2,Math.sin(z)/2)}},
mt:{"^":"n:9;a,b,c,d",
$3:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=b*6.283185307179586
y=this.a
x=this.b
w=J.dG(y.$1(z),x)
x=J.dG(y.$1(z+3.141592653589793/this.c),x).M(0,w)
x=new V.E(x.a,x.b,x.c)
v=x.w(0,Math.sqrt(x.F(x)))
u=new V.E(1,0,0)
y=v.aw(!v.u(0,u)?new V.E(0,0,1):u)
t=y.w(0,Math.sqrt(y.F(y)))
y=t.aw(v)
u=y.w(0,Math.sqrt(y.F(y)))
s=c*6.283185307179586
y=Math.cos(s)
x=this.d
r=Math.sin(s)
y=u.j(0,y*x)
x=t.j(0,r*x)
a.sa_(0,w.D(0,new V.a3(y.a-x.a,y.b-x.b,y.c-x.c)))}},
an:{"^":"b;0a,0b,0c,0d,0e",
ax:function(){if(!this.gaZ()){C.a.S(this.a.a.d.b,this)
this.a.a.Z()}this.c0()
this.c1()
this.fw()},
fF:function(a){this.a=a
C.a.h(a.d.b,this)},
fG:function(a){this.b=a
C.a.h(a.d.c,this)},
fH:function(a){this.c=a
C.a.h(a.d.d,this)},
c0:function(){var z=this.a
if(z!=null){C.a.S(z.d.b,this)
this.a=null}},
c1:function(){var z=this.b
if(z!=null){C.a.S(z.d.c,this)
this.b=null}},
fw:function(){var z=this.c
if(z!=null){C.a.S(z.d.d,this)
this.c=null}},
gaZ:function(){return this.a==null||this.b==null||this.c==null},
eI:function(){var z,y,x,w,v
z=this.a
y=z==null?null:z.r
z=this.b
x=z==null?null:z.r
z=this.c
w=z==null?null:z.r
v=new V.E(0,0,0)
if(y!=null)v=v.D(0,y)
if(x!=null)v=v.D(0,x)
if(w!=null)v=v.D(0,w)
if(v.dX())return
return v.w(0,Math.sqrt(v.F(v)))},
eL:function(){var z,y,x,w,v
z=this.a
y=z==null?null:z.f
z=this.b
x=z==null?null:z.f
z=this.c
w=z==null?null:z.f
if(y==null||x==null||w==null)return
z=x.M(0,y)
z=new V.E(z.a,z.b,z.c)
v=z.w(0,Math.sqrt(z.F(z)))
z=w.M(0,y)
z=new V.E(z.a,z.b,z.c)
z=v.aw(z.w(0,Math.sqrt(z.F(z))))
return z.w(0,Math.sqrt(z.F(z)))},
cd:function(){if(this.d!=null)return!0
var z=this.eI()
if(z==null){z=this.eL()
if(z==null)return!1}this.d=z
this.a.a.Z()
return!0},
eH:function(){var z,y,x,w,v
z=this.a
y=z==null?null:z.x
z=this.b
x=z==null?null:z.x
z=this.c
w=z==null?null:z.x
v=new V.E(0,0,0)
if(y!=null)v=v.D(0,y)
if(x!=null)v=v.D(0,x)
if(w!=null)v=v.D(0,w)
if(v.dX())return
return v.w(0,Math.sqrt(v.F(v)))},
eK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.a
y=z==null
x=y?null:z.f
w=this.b
v=w==null
u=v?null:w.f
t=this.c
s=t==null
r=s?null:t.f
if(x==null||u==null||r==null)return
q=y?null:z.y
p=v?null:w.y
o=s?null:t.y
if(q==null||p==null||o==null)return
z=p.b
n=z-o.b
if($.o.$2(n,0)){z=r.M(0,u)
z=new V.E(z.a,z.b,z.c)
m=z.w(0,Math.sqrt(z.F(z)))
if(o.a-p.a<0)m=m.P(0)}else{l=(z-q.b)/n
z=r.M(0,u).j(0,l).D(0,u).M(0,x)
z=new V.E(z.a,z.b,z.c)
m=z.w(0,Math.sqrt(z.F(z)))
o=o.a
p=p.a
if((o-p)*l+p-q.a<0)m=m.P(0)}z=this.d
if(z!=null){k=z.w(0,Math.sqrt(z.F(z)))
z=k.aw(m)
z=z.w(0,Math.sqrt(z.F(z))).aw(k)
m=z.w(0,Math.sqrt(z.F(z)))}return m},
cb:function(){if(this.e!=null)return!0
var z=this.eH()
if(z==null){z=this.eK()
if(z==null)return!1}this.e=z
this.a.a.Z()
return!0},
b_:function(){var z,y
z=this.b
this.b=this.c
this.c=z
y=this.d
if(y!=null)this.d=y.P(0)
y=this.e
if(y!=null)this.e=y.P(0)
this.a.a.Z()},
ghn:function(a){if(J.P(this.a,this.b))return!0
if(J.P(this.b,this.c))return!0
if(J.P(this.c,this.a))return!0
return!1},
u:function(a,b){if(b==null)return!1
return this===b},
i:function(a){return this.N()},
C:function(a){var z,y
if(this.gaZ())return a+"disposed"
z=a+C.b.a9(J.ab(this.a.e),0)+", "+C.b.a9(J.ab(this.b.e),0)+", "+C.b.a9(J.ab(this.c.e),0)+" {"
y=this.d
z=y!=null?z+(y.i(0)+", "):z+"-, "
y=this.e
return y!=null?z+(y.i(0)+"}"):z+"-}"},
N:function(){return this.C("")},
p:{
bB:function(a,b,c){var z,y,x
z=new F.an()
y=a.a
if(y==null)H.t(P.v("May not create a face with a first vertex which is not attached to a shape."))
x=b.a
if(y==null?x==null:y===x){x=c.a
x=y==null?x!=null:y!==x
y=x}else y=!0
if(y)H.t(P.v("May not create a face with vertices attached to different shapes."))
z.fF(a)
z.fG(b)
z.fH(c)
C.a.h(z.a.a.d.b,z)
z.a.a.Z()
return z}}},
hM:{"^":"b;"},
ji:{"^":"hM;",
b3:function(a,b,c){var z,y
z=b.a
z.a.a.A()
z=z.e
y=c.a
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.b
z.a.a.A()
z=z.e
y=c.b
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.c
z.a.a.A()
z=z.e
y=c.c
y.a.a.A()
y=y.e
y=z==null?y==null:z===y
z=y}else z=!1
return z}else{z=b.a
z.a.a.A()
z=z.e
y=c.b
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.b
z.a.a.A()
z=z.e
y=c.c
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.c
z.a.a.A()
z=z.e
y=c.a
y.a.a.A()
y=y.e
y=z==null?y==null:z===y
z=y}else z=!1
return z}else{z=b.a
z.a.a.A()
z=z.e
y=c.c
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.b
z.a.a.A()
z=z.e
y=c.a
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.c
z.a.a.A()
z=z.e
y=c.b
y.a.a.A()
y=y.e
y=z==null?y==null:z===y
z=y}else z=!1
return z}else return!1}}}},
d0:{"^":"b;0a,0b",
ax:function(){if(!this.gaZ()){C.a.S(this.a.a.c.b,this)
this.a.a.Z()}this.c0()
this.c1()},
c0:function(){var z=this.a
if(z!=null){C.a.S(z.c.b,this)
this.a=null}},
c1:function(){var z=this.b
if(z!=null){C.a.S(z.c.c,this)
this.b=null}},
gaZ:function(){return this.a==null||this.b==null},
u:function(a,b){if(b==null)return!1
return this===b},
i:function(a){return this.N()},
C:function(a){if(this.gaZ())return a+"disposed"
return a+C.b.a9(J.ab(this.a.e),0)+", "+C.b.a9(J.ab(this.b.e),0)},
N:function(){return this.C("")}},
i4:{"^":"b;"},
jF:{"^":"i4;",
b3:function(a,b,c){var z,y
z=b.a
z.a.a.A()
z=z.e
y=c.a
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.b
z.a.a.A()
z=z.e
y=c.b
y.a.a.A()
y=y.e
return z==null?y==null:z===y}else{z=b.a
z.a.a.A()
z=z.e
y=c.b
y.a.a.A()
y=y.e
if(z==null?y==null:z===y){z=b.b
z.a.a.A()
z=z.e
y=c.a
y.a.a.A()
y=y.e
return z==null?y==null:z===y}else return!1}}},
d8:{"^":"b;0a",
ax:function(){var z=this.a
if(z!=null){C.a.S(z.a.b.b,this)
this.a.a.Z()}this.fv()},
fv:function(){var z=this.a
if(z!=null){C.a.S(z.b.b,this)
this.a=null}},
u:function(a,b){if(b==null)return!1
return this===b},
i:function(a){return this.N()},
C:function(a){var z=this.a
if(z==null)return a+"disposed"
return a+C.b.a9(J.ab(z.e),0)},
N:function(){return this.C("")}},
eC:{"^":"b;0a,0b,0c,0d,0e",
gB:function(){var z=this.e
if(z==null){z=D.Q()
this.e=z}return z},
b4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.e
if(!(z==null))++z.c
a.a.A()
y=this.a.c.length
for(z=a.a.c,x=z.length,w=0;w<z.length;z.length===x||(0,H.A)(z),++w){v=z[w]
this.a.h(0,v.hp())}this.a.A()
for(z=a.b.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.A)(z),++w){u=z[w]
t=this.a
s=u.a
s.a.a.A()
s=s.e
if(typeof s!=="number")return s.D()
s+=y
t=t.c
if(s>=t.length)return H.d(t,s)
r=t[s]
this.b.a.a.h(0,r)
s=new F.d8()
if(r.a==null)H.t(P.v("May not create a point with a vertex which is not attached to a shape."))
s.a=r
C.a.h(r.b.b,s)
C.a.h(s.a.a.b.b,s)
t=s.a.a.e
if(!(t==null))t.G(null)}for(z=a.c.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.A)(z),++w){q=z[w]
t=this.a
s=q.a
s.a.a.A()
s=s.e
if(typeof s!=="number")return s.D()
s+=y
t=t.c
if(s>=t.length)return H.d(t,s)
p=t[s]
s=this.a
t=q.b
t.a.a.A()
t=t.e
if(typeof t!=="number")return t.D()
t+=y
s=s.c
if(t>=s.length)return H.d(s,t)
o=s[t]
t=this.c
t.a.a.h(0,p)
t.a.a.h(0,o)
t=new F.d0()
s=p.a
if(s==null)H.t(P.v("May not create a line with a start vertex which is not attached to a shape."))
n=o.a
if(s==null?n!=null:s!==n)H.t(P.v("May not create a line with vertices attached to different shapes."))
t.a=p
C.a.h(p.c.b,t)
t.b=o
C.a.h(o.c.c,t)
C.a.h(t.a.a.c.b,t)
t=t.a.a.e
if(!(t==null))t.G(null)}for(z=a.d.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.A)(z),++w){m=z[w]
t=this.a
s=m.a
s.a.a.A()
s=s.e
if(typeof s!=="number")return s.D()
s+=y
t=t.c
if(s>=t.length)return H.d(t,s)
p=t[s]
s=this.a
t=m.b
t.a.a.A()
t=t.e
if(typeof t!=="number")return t.D()
t+=y
s=s.c
if(t>=s.length)return H.d(s,t)
o=s[t]
t=this.a
s=m.c
s.a.a.A()
s=s.e
if(typeof s!=="number")return s.D()
s+=y
t=t.c
if(s>=t.length)return H.d(t,s)
l=t[s]
s=this.d
s.a.a.h(0,p)
s.a.a.h(0,o)
s.a.a.h(0,l)
F.bB(p,o,l)}z=this.e
if(!(z==null))z.aa(0)},
am:function(){var z,y
z=this.e
if(!(z==null))++z.c
y=this.d.am()||!1
if(!this.a.am())y=!1
z=this.e
if(!(z==null))z.aa(0)
return y},
eT:function(a,b,c,d,e){var z,y,x
H.w(d,"$isc",[F.ag],"$asc")
H.w(e,"$isc",[P.m],"$asc")
C.a.h(d,b)
C.a.h(e,c)
for(z=c-1;z>=0;--z){y=this.a.c
if(z>=y.length)return H.d(y,z)
x=y[z]
if(a.b3(0,b,x)){C.a.h(d,x)
C.a.h(e,z)}}return this.a.c.length>1},
hM:function(a,b){var z,y,x,w,v,u,t
z=this.e
if(!(z==null))++z.c
for(y=this.a.c.length-1,z=[F.ag],x=[P.m];y>=0;--y){w=this.a.c
if(y>=w.length)return H.d(w,y)
v=w[y]
u=H.e([],z)
t=H.e([],x)
if(this.eT(a,v,y,u,t))b.b4(u)}this.a.A()
this.c.cD()
this.d.cD()
this.b.i3()
this.c.cE(new F.jF())
this.d.cE(new F.ji())
z=this.e
if(!(z==null))z.aa(0)},
hi:function(a){this.hM(new F.kg(),new F.iD())},
c5:function(){return this.hi(null)},
b_:function(){var z,y,x,w,v,u
z=this.e
if(!(z==null))++z.c
this.d.b_()
for(y=this.a.c.length-1;y>=0;--y){z=this.a.c
if(y>=z.length)return H.d(z,y)
x=z[y]
z=x.r
if(z!=null)x.sdZ(new V.E(-z.a,-z.b,-z.c))
z=x.x
if(z!=null){w=-z.a
v=-z.b
z=-z.c
u=new V.E(w,v,z).w(0,Math.sqrt(w*w+v*v+z*z))
if(!J.P(x.x,u)){x.x=u
z=x.a
if(z!=null){z=z.e
if(!(z==null))z.G(null)}}}}z=this.e
if(!(z==null))z.aa(0)},
hl:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.a.c.length
b.toString
y=$.$get$aR()
x=b.a
w=(x&y.a)!==0?1:0
if((x&$.$get$aQ().a)!==0)++w
if((x&$.$get$aP().a)!==0)++w
if((x&$.$get$aS().a)!==0)++w
if((x&$.$get$aT().a)!==0)++w
if((x&$.$get$bO().a)!==0)++w
if((x&$.$get$bP().a)!==0)++w
if((x&$.$get$bo().a)!==0)++w
if((x&$.$get$aO().a)!==0)++w
v=b.gcP(b)
u=v*4
y=new Array(z*v)
y.fixed$length=Array
x=P.q
t=H.e(y,[x])
y=new Array(w)
y.fixed$length=Array
s=H.e(y,[Z.dQ])
for(r=0,q=0;q<w;++q){p=b.hj(q)
o=p.gcP(p)
C.a.m(s,q,new Z.dQ(p,o,r*4,u,0))
for(n=0;n<z;++n){y=this.a.c
if(n>=y.length)return H.d(y,n)
m=y[n].hJ(p)
l=r+n*v
for(k=0;k<m.length;++k){C.a.m(t,l,m[k]);++l}}r+=o}H.w(t,"$isc",[x],"$asc")
y=a.a
j=y.createBuffer()
y.bindBuffer(34962,j)
y.bufferData(34962,new Float32Array(H.bq(t)),35044)
y.bindBuffer(34962,null)
i=new Z.dR(new Z.ff(34962,j),s,b)
i.b=H.e([],[Z.cm])
if(this.b.b.length!==0){x=P.m
h=H.e([],[x])
for(q=0;g=this.b.b,q<g.length;++q){g=g[q].a
g.a.a.A()
C.a.h(h,g.e)}f=Z.dl(y,34963,H.w(h,"$isc",[x],"$asc"))
C.a.h(i.b,new Z.cm(0,h.length,f))}if(this.c.b.length!==0){x=P.m
h=H.e([],[x])
for(q=0;g=this.c.b,q<g.length;++q){g=g[q].a
g.a.a.A()
C.a.h(h,g.e)
g=this.c.b
if(q>=g.length)return H.d(g,q)
g=g[q].b
g.a.a.A()
C.a.h(h,g.e)}f=Z.dl(y,34963,H.w(h,"$isc",[x],"$asc"))
C.a.h(i.b,new Z.cm(1,h.length,f))}if(this.d.b.length!==0){x=P.m
h=H.e([],[x])
for(q=0;g=this.d.b,q<g.length;++q){g=g[q].a
g.a.a.A()
C.a.h(h,g.e)
g=this.d.b
if(q>=g.length)return H.d(g,q)
g=g[q].b
g.a.a.A()
C.a.h(h,g.e)
g=this.d.b
if(q>=g.length)return H.d(g,q)
g=g[q].c
g.a.a.A()
C.a.h(h,g.e)}f=Z.dl(y,34963,H.w(h,"$isc",[x],"$asc"))
C.a.h(i.b,new Z.cm(4,h.length,f))}return i},
i:function(a){var z=H.e([],[P.i])
if(this.a.c.length!==0){C.a.h(z,"Vertices:")
C.a.h(z,this.a.C("   "))}if(this.b.b.length!==0){C.a.h(z,"Points:")
C.a.h(z,this.b.C("   "))}if(this.c.b.length!==0){C.a.h(z,"Lines:")
C.a.h(z,this.c.C("   "))}if(this.d.b.length!==0){C.a.h(z,"Faces:")
C.a.h(z,this.d.C("   "))}return C.a.E(z,"\n")},
ai:function(a){var z=this.e
if(!(z==null))z.G(a)},
Z:function(){return this.ai(null)},
p:{
db:function(){var z,y
z=new F.eC()
y=new F.kb(z)
y.b=!1
y.c=H.e([],[F.ag])
z.a=y
y=new F.jd(z)
y.b=H.e([],[F.d8])
z.b=y
y=new F.jc(z)
y.b=H.e([],[F.d0])
z.c=y
y=new F.jb(z)
y.b=H.e([],[F.an])
z.d=y
z.e=null
return z}}},
jb:{"^":"b;a,0b",
hd:function(a){var z,y,x,w,v,u
H.w(a,"$isc",[F.ag],"$asc")
z=H.e([],[F.an])
y=a.length
if(y>0){x=a[0]
for(w=2;w<y;++w){v=w-1
u=a.length
if(v>=u)return H.d(a,v)
v=a[v]
if(w>=u)return H.d(a,w)
u=a[w]
this.a.a.h(0,x)
this.a.a.h(0,v)
this.a.a.h(0,u)
C.a.h(z,F.bB(x,v,u))}}return z},
he:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
H.w(c,"$isc",[F.ag],"$asc")
z=H.e([],[F.an])
for(y=b,x=0,w=!1,v=1;v<a;++v,++x,++y){for(u=w,t=1;t<b;++t,y=p){s=c.length
if(x<0||x>=s)return H.d(c,x)
r=c[x];++x
if(x>=s)return H.d(c,x)
q=c[x]
p=y+1
if(p<0||p>=s)return H.d(c,p)
o=c[p]
if(y<0||y>=s)return H.d(c,y)
n=c[y]
s=this.a.a
if(u){s.h(0,r)
this.a.a.h(0,q)
this.a.a.h(0,o)
C.a.h(z,F.bB(r,q,o))
this.a.a.h(0,r)
this.a.a.h(0,o)
this.a.a.h(0,n)
C.a.h(z,F.bB(r,o,n))}else{s.h(0,q)
this.a.a.h(0,o)
this.a.a.h(0,n)
C.a.h(z,F.bB(q,o,n))
this.a.a.h(0,q)
this.a.a.h(0,n)
this.a.a.h(0,r)
C.a.h(z,F.bB(q,n,r))}u=!u}w=!w}return z},
gl:function(a){return this.b.length},
cE:function(a){var z,y,x,w,v,u,t
for(z=this.a.a.c.length-1;z>=0;--z){y=this.a.a.c
if(z>=y.length)return H.d(y,z)
x=y[z]
for(y=x.d,w=y.b.length+y.c.length+y.d.length-1;w>=0;--w){v=x.d.k(0,w)
for(u=w-1;u>=0;--u){t=x.d.k(0,u)
if(a.b3(0,v,t)){v.ax()
break}}}}},
cD:function(){var z,y,x
for(z=this.b.length-1;z>=0;--z){y=this.b
if(z>=y.length)return H.d(y,z)
x=y[z]
y=x.ghn(x)
if(y)x.ax()}},
am:function(){var z,y,x,w
for(z=this.b,y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.A)(z),++w)if(!z[w].cd())x=!1
return x},
cc:function(){var z,y,x,w
for(z=this.b,y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.A)(z),++w)if(!z[w].cb())x=!1
return x},
b_:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x)z[x].b_()},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
z=H.e([],[P.i])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
return C.a.E(z,"\n")},
N:function(){return this.C("")}},
jc:{"^":"b;a,0b",
gl:function(a){return this.b.length},
cE:function(a){var z,y,x,w,v,u,t
for(z=this.a.a.c.length-1;z>=0;--z){y=this.a.a.c
if(z>=y.length)return H.d(y,z)
x=y[z]
for(y=x.c,w=y.b.length+y.c.length-1;w>=0;--w){v=x.c.k(0,w)
for(u=w-1;u>=0;--u){t=x.c.k(0,u)
if(a.b3(0,v,t)){v.ax()
break}}}}},
cD:function(){var z,y,x
for(z=this.b.length-1;z>=0;--z){y=this.b
if(z>=y.length)return H.d(y,z)
x=y[z]
y=J.P(x.a,x.b)
if(y)x.ax()}},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
z=H.e([],[P.i])
y=this.b.length
for(x=0;x<y;++x){w=this.b
if(x>=w.length)return H.d(w,x)
C.a.h(z,w[x].C(a+(""+x+". ")))}return C.a.E(z,"\n")},
N:function(){return this.C("")}},
jd:{"^":"b;a,0b",
gl:function(a){return this.b.length},
i3:function(){var z,y
for(z=this.b.length-1;z>=0;--z){y=this.b
if(z>=y.length)return H.d(y,z)
y=y[z]
if(y.a.b.b.length>1)y.ax()}},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
z=H.e([],[P.i])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
return C.a.E(z,"\n")},
N:function(){return this.C("")}},
ag:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx",
cg:function(a){var z,y,x,w,v,u,t
z=this.f
y=this.r
x=this.x
w=this.y
v=this.z
u=this.Q
t=this.ch
return F.c9(this.cx,x,u,z,y,w,v,a,t)},
hp:function(){return this.cg(null)},
sa_:function(a,b){var z
if(!J.P(this.f,b)){this.f=b
z=this.a
if(z!=null)z.Z()}},
sdZ:function(a){var z
a=a.w(0,Math.sqrt(a.F(a)))
if(!J.P(this.r,a)){this.r=a
z=this.a
if(z!=null)z.Z()}},
seb:function(a){var z
if(!J.P(this.z,a)){this.z=a
z=this.a
if(z!=null)z.Z()}},
sdk:function(a){var z
if(!J.P(this.cx,a)){this.cx=a
z=this.a
if(z!=null)z.Z()}},
hJ:function(a){var z,y
z=J.O(a)
if(z.u(a,$.$get$aR())){z=this.f
y=[P.q]
if(z==null)return H.e([0,0,0],y)
else return H.e([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$aQ())){z=this.r
y=[P.q]
if(z==null)return H.e([0,1,0],y)
else return H.e([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$aP())){z=this.x
y=[P.q]
if(z==null)return H.e([0,0,1],y)
else return H.e([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$aS())){z=this.y
y=[P.q]
if(z==null)return H.e([0,0],y)
else return H.e([z.a,z.b],y)}else if(z.u(a,$.$get$aT())){z=this.z
y=[P.q]
if(z==null)return H.e([0,0,0],y)
else return H.e([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$bO())){z=this.Q
y=[P.q]
if(z==null)return H.e([1,1,1],y)
else return H.e([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$bP())){z=this.Q
y=[P.q]
if(z==null)return H.e([1,1,1,1],y)
else return H.e([z.a,z.b,z.c,z.d],y)}else if(z.u(a,$.$get$bo()))return H.e([this.ch],[P.q])
else if(z.u(a,$.$get$aO())){z=this.cx
y=[P.q]
if(z==null)return H.e([-1,-1,-1,-1],y)
else return H.e([z.a,z.b,z.c,z.d],y)}else return H.e([],[P.q])},
cd:function(){var z,y
z={}
if(this.r!=null)return!0
y=this.a
if(y!=null){y=y.e
if(!(y==null))++y.c}z.a=new V.E(0,0,0)
this.d.L(0,new F.kl(z))
z=z.a
this.r=z.w(0,Math.sqrt(z.F(z)))
z=this.a
if(z!=null){z.Z()
z=this.a.e
if(!(z==null))z.aa(0)}return!0},
cb:function(){var z,y
z={}
if(this.x!=null)return!0
y=this.a
if(y!=null){y=y.e
if(!(y==null))++y.c}z.a=new V.E(0,0,0)
this.d.L(0,new F.kk(z))
z=z.a
this.x=z.w(0,Math.sqrt(z.F(z)))
z=this.a
if(z!=null){z.Z()
z=this.a.e
if(!(z==null))z.aa(0)}return!0},
u:function(a,b){if(b==null)return!1
return this===b},
i:function(a){return this.N()},
C:function(a){var z,y,x
z=H.e([],[P.i])
C.a.h(z,C.b.a9(J.ab(this.e),0))
y=this.f
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.r
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.x
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.y
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.z
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.Q
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
C.a.h(z,V.I(this.ch,3,0))
y=this.cx
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
x=C.a.E(z,", ")
return a+"{"+x+"}"},
N:function(){return this.C("")},
p:{
c9:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=new F.ag()
y=new F.kj(z)
y.b=H.e([],[F.d8])
z.b=y
y=new F.kf(z)
x=[F.d0]
y.b=H.e([],x)
y.c=H.e([],x)
z.c=y
y=new F.kc(z)
x=[F.an]
y.b=H.e([],x)
y.c=H.e([],x)
y.d=H.e([],x)
z.d=y
h=$.$get$fc()
z.e=0
y=$.$get$aR()
x=h.a
z.f=(x&y.a)!==0?d:null
z.r=(x&$.$get$aQ().a)!==0?e:null
z.x=(x&$.$get$aP().a)!==0?b:null
z.y=(x&$.$get$aS().a)!==0?f:null
z.z=(x&$.$get$aT().a)!==0?g:null
z.Q=(x&$.$get$fd().a)!==0?c:null
z.ch=(x&$.$get$bo().a)!==0?i:0
z.cx=(x&$.$get$aO().a)!==0?a:null
return z}}},
kl:{"^":"n:10;a",
$1:function(a){var z,y
H.f(a,"$isan")
z=a==null?null:a.d
if(z!=null){y=this.a
y.a=y.a.D(0,z)}}},
kk:{"^":"n:10;a",
$1:function(a){var z,y
H.f(a,"$isan")
z=a==null?null:a.e
if(z!=null){y=this.a
y.a=y.a.D(0,z)}}},
kb:{"^":"b;a,0b,0c",
A:function(){var z,y,x,w
if(this.b){z=this.c
y=z.length
for(x=0,w=0;w<y;++w){if(w>=z.length)return H.d(z,w)
z[w].e=x;++x}this.b=!1}},
h:function(a,b){var z=b.a
if(z!=null){if(z===this.a)return!1
throw H.a(P.v("May not add a vertex already attached to another shape to this shape."))}z=this.c
b.e=z.length
b.a=this.a
C.a.h(z,b)
this.a.Z()
return!0},
hg:function(a,b,c,d,e,f,g,h,i){var z=F.c9(a,b,c,d,e,f,g,h,i)
this.h(0,z)
return z},
hf:function(a,b,c,d,e,f){return this.hg(a,null,b,c,d,e,f,null,0)},
gl:function(a){return this.c.length},
am:function(){var z,y,x
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x)z[x].cd()
return!0},
cc:function(){var z,y,x
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x)z[x].cb()
return!0},
hm:function(){var z,y,x,w,v,u,t,s
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x){w=z[x]
if(w.z==null){v=w.r
u=v.a
t=v.b
s=v.c
s=v.w(0,Math.sqrt(u*u+t*t+s*s))
if(!J.P(w.z,s)){w.z=s
v=w.a
if(v!=null){v=v.e
if(!(v==null))v.G(null)}}}}return!0},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
this.A()
z=H.e([],[P.i])
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
return C.a.E(z,"\n")},
N:function(){return this.C("")}},
kc:{"^":"b;a,0b,0c,0d",
gl:function(a){return this.b.length+this.c.length+this.d.length},
k:function(a,b){var z,y,x
z=this.b
y=z.length
if(b<y){if(b<0)return H.d(z,b)
return z[b]}b-=y
z=this.c
x=z.length
if(b<x){if(b<0)return H.d(z,b)
return z[b]}b-=x
z=this.d
if(b<0||b>=z.length)return H.d(z,b)
return z[b]},
L:function(a,b){H.h(b,{func:1,ret:-1,args:[F.an]})
C.a.L(this.b,b)
C.a.L(this.c,new F.kd(this,b))
C.a.L(this.d,new F.ke(this,b))},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
z=H.e([],[P.i])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
return C.a.E(z,"\n")},
N:function(){return this.C("")}},
kd:{"^":"n:10;a,b",
$1:function(a){H.f(a,"$isan")
if(!J.P(a.a,this.a))this.b.$1(a)}},
ke:{"^":"n:10;a,b",
$1:function(a){var z
H.f(a,"$isan")
z=this.a
if(!J.P(a.a,z)&&!J.P(a.b,z))this.b.$1(a)}},
kf:{"^":"b;a,0b,0c",
gl:function(a){return this.b.length+this.c.length},
k:function(a,b){var z,y,x
z=this.b
y=z.length
if(b>=y){z=this.c
x=b-y
if(x<0||x>=z.length)return H.d(z,x)
return z[x]}else{if(b<0)return H.d(z,b)
return z[b]}},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
z=H.e([],[P.i])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
return C.a.E(z,"\n")},
N:function(){return this.C("")}},
kh:{"^":"b;"},
kg:{"^":"kh;",
b3:function(a,b,c){return J.P(b.f,c.f)}},
ki:{"^":"b;"},
iD:{"^":"ki;",
b4:function(a){var z,y,x,w
H.w(a,"$isc",[F.ag],"$asc")
z=new V.E(0,0,0)
for(y=a.length,x=0;x<y;++x){w=a[x].r
if(w!=null)z=new V.E(z.a+w.a,z.b+w.b,z.c+w.c)}z=z.w(0,Math.sqrt(z.F(z)))
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.A)(a),++x)a[x].sdZ(z)
return}},
kj:{"^":"b;a,0b",
gl:function(a){return this.b.length},
i:function(a){return this.N()},
C:function(a){var z,y,x,w
z=H.e([],[P.i])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.A)(y),++w)C.a.h(z,y[w].C(a))
return C.a.E(z,"\n")},
N:function(){return this.C("")}}}],["","",,O,{"^":"",io:{"^":"de;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy",
gB:function(){var z=this.dy
if(z==null){z=D.Q()
this.dy=z}return z},
af:[function(a){var z
H.f(a,"$isu")
z=this.dy
if(!(z==null))z.G(a)},function(){return this.af(null)},"iv","$1","$0","gf6",0,2,1],
fC:[function(a){H.f(a,"$isu")
this.a=null
this.af(a)},function(){return this.fC(null)},"iQ","$1","$0","gfB",0,2,1],
is:[function(a,b){var z=V.av
z=new D.cn(a,H.w(b,"$isk",[z],"$ask"),this,[z])
z.b=!0
this.af(z)},"$2","gf3",8,0,21],
it:[function(a,b){var z=V.av
z=new D.co(a,H.w(b,"$isk",[z],"$ask"),this,[z])
z.b=!0
this.af(z)},"$2","gf4",8,0,21],
cZ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.dx
y=C.d.a3(z.e.length+3,4)*4
x=C.d.a3(z.f.length+3,4)*4
w=C.d.a3(z.r.length+3,4)*4
v=C.d.a3(z.x.length+3,4)*4
u=C.d.a3(z.y.length+3,4)*4
t=C.d.a3(z.z.length+3,4)*4
s=C.d.a3(this.e.a.length+3,4)*4
z=this.b!=null
r=this.c!=null
q=this.f.c
p=this.r.c
o=this.x.c
n=this.y.c
m=this.z.c
l=this.Q.c
k=this.cx.c
j=this.cy.c
i=this.db.c
h="MaterialLight_"+C.d.i(q.a)+C.d.i(p.a)+C.d.i(o.a)+C.d.i(n.a)+C.d.i(m.a)+C.d.i(l.a)+C.d.i(k.a)+C.d.i(j.a)+C.d.i(i.a)+"_"
h+=z?"1":"0"
h+=r?"1":"0"
h+"0"
h=h+"0_"+s+"_"+y+"_"+x+"_"+w+"_"+v+"_"+u+"_"+t
g=k!==C.c||j!==C.c
f=p!==C.c||o!==C.c||n!==C.c||m!==C.c
e=m===C.c
d=!e||g
c=o!==C.c||n!==C.c||!e||l!==C.c||g
e=l===C.c
b=!e
a=q===C.e||p===C.e||o===C.e||n===C.e||m===C.e||l===C.e||k===C.e||j===C.e||i===C.e
a0=q===C.f||p===C.f||o===C.f||n===C.f||m===C.f||l===C.f||k===C.f||j===C.f||i===C.f
a1=x+u+v+w+t>0
a2=s>0
a3=c||!e||d
a4=z&&a
a5=r&&a0
a6=$.$get$aR()
if(c){z=$.$get$aQ()
a6=new Z.bn(a6.a|z.a)}if(b){z=$.$get$aP()
a6=new Z.bn(a6.a|z.a)}if(a){z=$.$get$aS()
a6=new Z.bn(a6.a|z.a)}if(a0){z=$.$get$aT()
a6=new Z.bn(a6.a|z.a)}if(a2){z=$.$get$aO()
a6=new Z.bn(a6.a|z.a)}return new A.it(q,p,o,n,m,l,k,j,i,y,x,w,v,u,t,y+x+w+v+u+t,g,g,a1,a3,!0,!1,!1,f,a1,d,c,b,a,a0,a2,a4,a5,!1,s,h.charCodeAt(0)==0?h:h,a6)},
W:function(a,b){H.w(a,"$isc",[T.eJ],"$asc")},
ap:function(a,b){var z,y,x,w
for(z=this.dx.a,z=new J.az(z,z.length,0,[H.y(z,0)]);z.I();){y=z.d
y.a=new V.E(0,0,1)
x=y.b
if(x!=null){w=x.aq(0,b,y)
if(w!=null)y.a=w.cH(y.a)}}},
i5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
if(z==null){z=this.cZ()
y=a.fr.k(0,z.ay)
if(y==null){y=A.ip(z,a.a)
x=y.b
if(x.length===0)H.t(P.v("May not cache a shader with no name."))
if(a.fr.br(0,x))H.t(P.v('Shader cache already contains a shader by the name "'+x+'".'))
a.fr.m(0,x,y)}this.a=y
b.e=null
z=y}w=z.x
v=w.aP
z=b.e
if(!(z instanceof Z.dR)){b.e=null
z=null}if(z==null||!z.d.u(0,v)){z=w.r1
if(z)b.d.am()
u=w.r2
if(u){t=b.d
s=t.e
if(!(s==null))++s.c
t.d.cc()
t.a.cc()
t=t.e
if(!(t==null))t.aa(0)}t=w.ry
if(t){s=b.d
r=s.e
if(!(r==null))++r.c
s.a.hm()
s=s.e
if(!(s==null))s.aa(0)}q=b.d.hl(new Z.km(a.a),v)
q.aQ($.$get$aR()).e=this.a.y.c
if(z)q.aQ($.$get$aQ()).e=this.a.Q.c
if(u)q.aQ($.$get$aP()).e=this.a.z.c
if(w.rx)q.aQ($.$get$aS()).e=this.a.ch.c
if(t)q.aQ($.$get$aT()).e=this.a.cx.c
if(w.x1)q.aQ($.$get$aO()).e=this.a.cy.c
b.e=q}z=T.eJ
p=H.e([],[z])
u=this.a
a.a.useProgram(u.e)
u.f.hv()
if(w.fx){u=this.a
t=a.dx
t=t.gY(t)
u=u.db
u.toString
u.aj(t.ac(0,!0))}if(w.fy){u=this.a
t=a.cx
if(t==null){t=a.db
t=t.gY(t)
s=a.dx
s=t.j(0,s.gY(s))
a.cx=s
t=s}u=u.dx
u.toString
u.aj(t.ac(0,!0))}u=this.a
t=a.ch
if(t==null){t=a.gi1()
s=a.dx
s=t.j(0,s.gY(s))
a.ch=s
t=s}u=u.fr
u.toString
u.aj(t.ac(0,!0))
if(w.x2){u=this.a
t=this.b
u=u.go
u.toString
u.aj(t.ac(0,!0))}if(w.y1){u=this.a
t=this.c
u=u.id
u.toString
u.aj(t.ac(0,!0))}if(w.y2){u=this.a
t=this.d
u=u.k1
u.toString
u.aj(C.t.ac(t,!0))}if(w.aO>0){o=this.e.a.length
u=this.a.k2
u.a.uniform1i(u.d,o)
for(u=[P.q],n=0;n<o;++n){t=this.a
s=this.e.a
if(n>=s.length)return H.d(s,n)
s=s[n]
t.toString
H.f(s,"$isav")
t=t.k3
if(n>=t.length)return H.d(t,n)
t=t[n]
m=new Float32Array(H.bq(H.w(s.ac(0,!0),"$isc",u,"$asc")))
t.a.uniformMatrix4fv(t.d,!1,m)}}switch(w.a){case C.c:break
case C.i:u=this.a
t=this.f.f
u=u.k4
u.toString
s=t.a
r=t.b
t=t.c
u.a.uniform3f(u.d,s,r,t)
break
case C.e:this.W(p,this.f.d)
u=this.a
t=this.f.d
u.ag(u.r1,u.rx,t)
t=this.a
u=this.f.f
t=t.k4
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break
case C.f:this.W(p,this.f.e)
u=this.a
t=this.f.e
u.a7(u.r2,u.rx,t)
t=this.a
u=this.f.f
t=t.k4
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break}if(w.k2){switch(w.b){case C.c:break
case C.i:u=this.a
t=this.r.f
u=u.ry
u.toString
s=t.a
r=t.b
t=t.c
u.a.uniform3f(u.d,s,r,t)
break
case C.e:this.W(p,this.r.d)
u=this.a
t=this.r.d
u.ag(u.x1,u.y1,t)
t=this.a
u=this.r.f
t=t.ry
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break
case C.f:this.W(p,this.r.e)
u=this.a
t=this.r.e
u.a7(u.x2,u.y1,t)
t=this.a
u=this.r.f
t=t.ry
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break}switch(w.c){case C.c:break
case C.i:u=this.a
t=this.x.f
u=u.y2
u.toString
s=t.a
r=t.b
t=t.c
u.a.uniform3f(u.d,s,r,t)
break
case C.e:this.W(p,this.x.d)
u=this.a
t=this.x.d
u.ag(u.aO,u.aP,t)
t=this.a
u=this.x.f
t=t.y2
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break
case C.f:this.W(p,this.x.e)
u=this.a
t=this.x.e
u.a7(u.ay,u.aP,t)
t=this.a
u=this.x.f
t=t.y2
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break}switch(w.d){case C.c:break
case C.i:u=this.a
t=this.y.f
u=u.bs
u.toString
s=t.a
r=t.b
t=t.c
u.a.uniform3f(u.d,s,r,t)
break
case C.e:this.W(p,this.y.d)
u=this.a
t=this.y.d
u.ag(u.dq,u.bt,t)
t=this.a
u=this.y.f
t=t.bs
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break
case C.f:this.W(p,this.y.e)
u=this.a
t=this.y.e
u.a7(u.dr,u.bt,t)
t=this.a
u=this.y.f
t=t.bs
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
break}switch(w.e){case C.c:break
case C.i:u=this.a
t=this.z.f
u=u.bu
u.toString
s=t.a
r=t.b
t=t.c
u.a.uniform3f(u.d,s,r,t)
t=this.a
r=this.z.ch
t=t.bw
t.a.uniform1f(t.d,r)
break
case C.e:this.W(p,this.z.d)
u=this.a
t=this.z.d
u.ag(u.ds,u.bv,t)
t=this.a
u=this.z.f
t=t.bu
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
u=this.a
r=this.z.ch
u=u.bw
u.a.uniform1f(u.d,r)
break
case C.f:this.W(p,this.z.e)
u=this.a
t=this.z.e
u.a7(u.dt,u.bv,t)
t=this.a
u=this.z.f
t=t.bu
t.toString
s=u.a
r=u.b
u=u.c
t.a.uniform3f(t.d,s,r,u)
u=this.a
r=this.z.ch
u=u.bw
u.a.uniform1f(u.d,r)
break}if(w.z>0){o=this.dx.e.length
u=this.a.dG
u.a.uniform1i(u.d,o)
u=a.db
l=u.gY(u)
for(u=this.dx.e,t=u.length,k=0,j=0;j<u.length;u.length===t||(0,H.A)(u),++j){i=u[j]
s=this.a.ck
if(k>=s.length)return H.d(s,k)
h=s[k]
s=l.cH(i.a)
r=s.a
g=s.b
f=s.c
f=s.w(0,Math.sqrt(r*r+g*g+f*f))
g=h.b
g.a.uniform3f(g.d,f.a,f.b,f.c)
f=i.c
g=h.c
g.a.uniform3f(g.d,f.a,f.b,f.c);++k}}if(w.Q>0){o=this.dx.f.length
u=this.a.dH
u.a.uniform1i(u.d,o)
u=a.db
l=u.gY(u)
for(u=this.dx.f,t=u.length,k=0,j=0;j<u.length;u.length===t||(0,H.A)(u),++j){i=u[j]
s=this.a.cl
if(k>=s.length)return H.d(s,k)
h=s[k]
s=i.gb8(i)
r=h.b
g=s.gq(s)
f=s.gt(s)
s=s.gcK(s)
r.a.uniform3f(r.d,g,f,s)
s=l.be(i.gb8(i))
f=h.c
f.a.uniform3f(f.d,s.a,s.b,s.c)
s=i.gah(i)
f=h.d
g=s.gbG()
r=s.gbf()
s=s.gbo()
f.a.uniform3f(f.d,g,r,s)
s=i.gc6()
r=h.e
r.a.uniform1f(r.d,s)
s=i.gc7()
r=h.f
r.a.uniform1f(r.d,s)
s=i.gc8()
r=h.r
r.a.uniform1f(r.d,s);++k}}if(w.ch>0){o=this.dx.r.length
u=this.a.dI
u.a.uniform1i(u.d,o)
u=a.db
l=u.gY(u)
for(u=this.dx.r,t=u.length,k=0,j=0;j<u.length;u.length===t||(0,H.A)(u),++j){i=u[j]
s=this.a.cm
if(k>=s.length)return H.d(s,k)
h=s[k]
s=i.gb8(i)
r=h.b
g=s.gq(s)
f=s.gt(s)
s=s.gcK(s)
r.a.uniform3f(r.d,g,f,s)
s=i.gcj(i).iX()
f=h.c
g=s.gaL(s)
r=s.gaM(s)
s=s.gaN()
f.a.uniform3f(f.d,g,r,s)
s=l.be(i.gb8(i))
r=h.d
r.a.uniform3f(r.d,s.a,s.b,s.c)
s=i.gah(i)
r=h.e
g=s.gbG()
f=s.gbf()
s=s.gbo()
r.a.uniform3f(r.d,g,f,s)
s=i.giV()
f=h.f
f.a.uniform1f(f.d,s)
s=i.giU()
f=h.r
f.a.uniform1f(f.d,s)
s=i.gc6()
f=h.x
f.a.uniform1f(f.d,s)
s=i.gc7()
f=h.y
f.a.uniform1f(f.d,s)
s=i.gc8()
f=h.z
f.a.uniform1f(f.d,s);++k}}if(w.cx>0){o=this.dx.x.length
u=this.a.dJ
u.a.uniform1i(u.d,o)
u=a.db
l=u.gY(u)
for(u=this.dx.x,t=u.length,s=[z],k=0,j=0;j<u.length;u.length===t||(0,H.A)(u),++j){i=u[j]
r=this.a.cn
if(k>=r.length)return H.d(r,k)
h=r[k]
r=i.gba()
H.w(p,"$isc",s,"$asc")
if(!C.a.bq(p,r)){r.sb0(0,p.length)
C.a.h(p,r)}r=i.gcj(i)
g=h.d
f=r.gaL(r)
e=r.gaM(r)
r=r.gaN()
g.a.uniform3f(g.d,f,e,r)
r=i.gbH()
e=h.b
f=r.gaL(r)
g=r.gaM(r)
r=r.gaN()
e.a.uniform3f(e.d,f,g,r)
r=i.gb9(i)
g=h.c
f=r.gaL(r)
e=r.gaM(r)
r=r.gaN()
g.a.uniform3f(g.d,f,e,r)
r=l.cH(i.gcj(i))
e=r.a
f=r.b
g=r.c
g=r.w(0,Math.sqrt(e*e+f*f+g*g))
f=h.e
f.a.uniform3f(f.d,g.a,g.b,g.c)
g=i.gah(i)
f=h.f
e=g.gbG()
r=g.gbf()
g=g.gbo()
f.a.uniform3f(f.d,e,r,g)
g=i.gba()
r=g.gb1(g)
if(!r){r=h.x
r.a.uniform1i(r.d,1)}else{r=h.r
f=g.gb1(g)
e=r.a
r=r.d
if(!f)e.uniform1i(r,0)
else e.uniform1i(r,g.gb0(g))
r=h.x
r.a.uniform1i(r.d,0)}++k}}if(w.cy>0){o=this.dx.y.length
u=this.a.dK
u.a.uniform1i(u.d,o)
u=a.db
l=u.gY(u)
for(u=this.dx.y,t=u.length,s=[P.q],r=[z],k=0,j=0;j<u.length;u.length===t||(0,H.A)(u),++j){i=u[j]
g=this.a.co
if(k>=g.length)return H.d(g,k)
h=g[k]
g=i.gba()
H.w(p,"$isc",r,"$asc")
if(!C.a.bq(p,g)){g.sb0(0,p.length)
C.a.h(p,g)}d=l.j(0,i.gY(i))
g=i.gY(i).be(new V.a3(0,0,0))
f=h.b
e=g.gq(g)
c=g.gt(g)
g=g.gcK(g)
f.a.uniform3f(f.d,e,c,g)
g=d.be(new V.a3(0,0,0))
c=h.c
c.a.uniform3f(c.d,g.a,g.b,g.c)
g=d.dW(0)
c=h.d
m=new Float32Array(H.bq(H.w(new V.cq(g.a,g.b,g.c,g.e,g.f,g.r,g.y,g.z,g.Q).ac(0,!0),"$isc",s,"$asc")))
c.a.uniformMatrix3fv(c.d,!1,m)
c=i.gah(i)
g=h.e
e=c.gbG()
f=c.gbf()
c=c.gbo()
g.a.uniform3f(g.d,e,f,c)
c=i.gba()
g=c.gb1(c)
if(!g){g=h.r
g.a.uniform1i(g.d,1)}else{g=h.f
f=c.gb1(c)
e=g.a
g=g.d
if(!f)e.uniform1i(g,0)
else e.uniform1i(g,c.gb0(c))
g=h.r
g.a.uniform1i(g.d,0)}g=i.gc6()
f=h.x
f.a.uniform1f(f.d,g)
g=i.gc7()
f=h.y
f.a.uniform1f(f.d,g)
g=i.gc8()
f=h.z
f.a.uniform1f(f.d,g);++k}}if(w.db>0){o=this.dx.z.length
u=this.a.dL
u.a.uniform1i(u.d,o)
u=a.db
l=u.gY(u)
for(u=this.dx.z,t=u.length,z=[z],k=0,j=0;j<u.length;u.length===t||(0,H.A)(u),++j){i=u[j]
s=this.a.cp
if(k>=s.length)return H.d(s,k)
h=s[k]
s=i.gba()
H.w(p,"$isc",z,"$asc")
if(!C.a.bq(p,s)){s.sb0(0,p.length)
C.a.h(p,s)}s=i.gb8(i)
r=h.b
g=s.gq(s)
f=s.gt(s)
s=s.gcK(s)
r.a.uniform3f(r.d,g,f,s)
s=i.gcj(i)
f=h.c
g=s.gaL(s)
r=s.gaM(s)
s=s.gaN()
f.a.uniform3f(f.d,g,r,s)
s=i.gbH()
r=h.d
g=s.gaL(s)
f=s.gaM(s)
s=s.gaN()
r.a.uniform3f(r.d,g,f,s)
s=i.gb9(i)
f=h.e
g=s.gaL(s)
r=s.gaM(s)
s=s.gaN()
f.a.uniform3f(f.d,g,r,s)
s=l.be(i.gb8(i))
r=h.f
r.a.uniform3f(r.d,s.a,s.b,s.c)
s=i.gba()
r=s.gb1(s)
if(!r){s=h.x
s.a.uniform1i(s.d,1)}else{r=h.r
g=s.gb1(s)
f=r.a
r=r.d
if(!g)f.uniform1i(r,0)
else f.uniform1i(r,s.gb0(s))
s=h.x
s.a.uniform1i(s.d,0)}s=i.gah(i)
r=h.y
g=s.gbG()
f=s.gbf()
s=s.gbo()
r.a.uniform3f(r.d,g,f,s)
s=i.gj2()
f=h.z
f.a.uniform1f(f.d,s)
s=i.gj3()
f=h.Q
f.a.uniform1f(f.d,s)
s=i.gc6()
f=h.ch
f.a.uniform1f(f.d,s)
s=i.gc7()
f=h.cx
f.a.uniform1f(f.d,s)
s=i.gc8()
f=h.cy
f.a.uniform1f(f.d,s);++k}}}switch(w.f){case C.c:break
case C.i:break
case C.e:this.W(p,this.Q.d)
z=this.a
u=this.Q.d
z.ag(z.du,z.bx,u)
break
case C.f:this.W(p,this.Q.e)
z=this.a
u=this.Q.e
z.a7(z.dv,z.bx,u)
break}if(w.fr){z=this.a
u=a.Q
if(u==null){u=a.db
u=u.gY(u).dW(0)
a.Q=u}z=z.fy
z.toString
z.aj(u.ac(0,!0))}if(w.dy){this.W(p,this.ch)
z=this.a
u=this.ch
z.a7(z.dw,z.dz,u)
switch(w.r){case C.c:break
case C.i:z=this.a
u=this.cx.f
z=z.by
z.toString
t=u.a
s=u.b
u=u.c
z.a.uniform3f(z.d,t,s,u)
break
case C.e:this.W(p,this.cx.d)
z=this.a
u=this.cx.d
z.ag(z.dA,z.bz,u)
u=this.a
z=this.cx.f
u=u.by
u.toString
t=z.a
s=z.b
z=z.c
u.a.uniform3f(u.d,t,s,z)
break
case C.f:this.W(p,this.cx.e)
z=this.a
u=this.cx.e
z.a7(z.dB,z.bz,u)
u=this.a
z=this.cx.f
u=u.by
u.toString
t=z.a
s=z.b
z=z.c
u.a.uniform3f(u.d,t,s,z)
break}switch(w.x){case C.c:break
case C.i:z=this.a
u=this.cy.f
z=z.bB
z.toString
t=u.a
s=u.b
u=u.c
z.a.uniform3f(z.d,t,s,u)
u=this.a
s=this.cy.ch
u=u.bA
u.a.uniform1f(u.d,s)
break
case C.e:this.W(p,this.cy.d)
z=this.a
u=this.cy.d
z.ag(z.dC,z.bC,u)
u=this.a
z=this.cy.f
u=u.bB
u.toString
t=z.a
s=z.b
z=z.c
u.a.uniform3f(u.d,t,s,z)
z=this.a
s=this.cy.ch
z=z.bA
z.a.uniform1f(z.d,s)
break
case C.f:this.W(p,this.cy.e)
z=this.a
u=this.cy.e
z.a7(z.dD,z.bC,u)
u=this.a
z=this.cy.f
u=u.bB
u.toString
t=z.a
s=z.b
z=z.c
u.a.uniform3f(u.d,t,s,z)
z=this.a
s=this.cy.ch
z=z.bA
z.a.uniform1f(z.d,s)
break}}z=w.y
u=z!==C.c
if(u){switch(z){case C.c:break
case C.i:z=this.a
t=this.db.f
z=z.bD
z.a.uniform1f(z.d,t)
break
case C.e:this.W(p,this.db.d)
z=this.a
t=this.db.d
z.ag(z.dE,z.bE,t)
t=this.a
z=this.db.f
t=t.bD
t.a.uniform1f(t.d,z)
break
case C.f:this.W(p,this.db.e)
z=this.a
t=this.db.e
z.a7(z.dF,z.bE,t)
t=this.a
z=this.db.f
t=t.bD
t.a.uniform1f(t.d,z)
break}a.a.enable(3042)
a.a.blendFunc(770,771)}for(n=0;n<p.length;++n)p[n].bn(a)
z=b.e
z.bn(a)
z.aS(a)
z.ee(a)
if(u)a.a.disable(3042)
for(n=0;n<p.length;++n)p[n].ee(a)
z=this.a
z.toString
a.a.useProgram(null)
z.f.hu()},
i:function(a){var z=this.a
if(z!=null)return z.b
else return this.cZ().ay}},ir:{"^":"d2;0f,a,b,0c,0d,0e"},d2:{"^":"b;",
bk:["eq",function(){}]},is:{"^":"d2;a,b,0c,0d,0e"},ba:{"^":"d2;0f,a,b,0c,0d,0e",
da:function(a){var z,y
if(!J.P(this.f,a)){z=this.f
this.f=a
y=new D.H(this.b+".color",z,a,this,[V.Z])
y.b=!0
this.a.af(y)}},
bk:["bL",function(){this.eq()
this.da(new V.Z(1,1,1))}],
sah:function(a,b){var z
if(this.c===C.c){this.c=C.i
this.bk()
z=this.a
z.a=null
z.af(null)}this.da(b)}},iu:{"^":"ba;0ch,0f,a,b,0c,0d,0e",
fE:function(a){var z,y
z=this.ch
if(!$.o.$2(z,a)){y=this.ch
this.ch=a
z=new D.H(this.b+".refraction",y,a,this,[P.q])
z.b=!0
this.a.af(z)}},
bk:function(){this.bL()
this.fE(1)}},iv:{"^":"ba;0ch,0f,a,b,0c,0d,0e",
c2:function(a){var z,y
z=this.ch
if(!$.o.$2(z,a)){y=this.ch
this.ch=a
z=new D.H(this.b+".shininess",y,a,this,[P.q])
z.b=!0
this.a.af(z)}},
bk:function(){this.bL()
this.c2(100)}},de:{"^":"b;"}}],["","",,T,{"^":"",eJ:{"^":"cM;"},js:{"^":"b;a,0b,0c,0d,0e"}}],["","",,V,{"^":"",hf:{"^":"b;",
b2:function(a,b){return!0},
i:function(a){return"all"},
$isc4:1},c4:{"^":"b;"},el:{"^":"b;",
b2:["ep",function(a,b){var z,y,x
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x)if(z[x].b2(0,b))return!0
return!1}],
i:["cQ",function(a){var z,y,x,w,v
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.A)(z),++w){v=z[w]
if(x.length!==0)x+=", "
x+=v.i(0)}return x}],
$isc4:1},bI:{"^":"el;0a",
b2:function(a,b){return!this.ep(0,b)},
i:function(a){return"!["+this.cQ(0)+"]"}},j9:{"^":"b;0a",
ev:function(a){var z,y
if(a.a.length<=0)throw H.a(P.v("May not create a SetMatcher with zero characters."))
z=new H.aY(0,0,[P.m,P.ai])
for(y=new H.ej(a,a.gl(a),0,[H.ay(a,"x",0)]);y.I();)z.m(0,y.d,!0)
this.a=z},
b2:function(a,b){return this.a.br(0,b)},
i:function(a){var z=this.a
return P.c6(z.gao(z),0,null)},
$isc4:1,
p:{
aa:function(a){var z=new V.j9()
z.ev(a)
return z}}},eE:{"^":"b;a,b,0c,0d",
ghN:function(a){return this.b},
E:function(a,b){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<y;++x){w=z[x]
if(w.b.b===b)return w}w=new V.eP(this.a.R(0,b))
w.a=H.e([],[V.c4])
w.c=!1
C.a.h(this.c,w)
return w},
hx:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.A)(z),++x){w=z[x]
if(w.b2(0,a))return w}return},
i:function(a){return this.b}},eM:{"^":"b;a,b,c",
i:function(a){var z,y
z=H.h4(this.b,"\n","\\n")
y=H.h4(z,"\t","\\t")
return this.a+":"+this.c+':"'+y+'"'}},eN:{"^":"b;a,b,0c",
i:function(a){return this.b}},jB:{"^":"b;0a,0b,0c",
R:function(a,b){var z=this.a.k(0,b)
if(z==null){z=new V.eE(this,b)
z.c=H.e([],[V.eP])
this.a.m(0,b,z)}return z},
bc:function(a){var z,y
z=this.b.k(0,a)
if(z==null){z=new V.eN(this,a)
y=P.i
z.c=new H.aY(0,0,[y,y])
this.b.m(0,a,z)}return z},
ih:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=H.e([],[V.eM])
y=this.c
x=[P.m]
w=H.e([],x)
for(v=a.length,u=null,t=0;!0;){if(t>=v){if(u!=null)C.a.h(z,u)
return z}s=C.b.H(a,t)
r=y.hx(s)
if(r==null){if(u==null){C.a.h(w,s)
q=P.c6(w,0,null)
throw H.a(P.v("Untokenizable string [state: "+y.ghN(y)+", index "+t+']: "'+q+'"'))}C.a.h(z,u)
t=u.c+1
w=H.e([],x)
y=this.c
u=null}else{if(!r.c)C.a.h(w,s)
y=r.b
if(y.d!=null){q=P.c6(w,0,null)
p=y.d
o=p.c.k(0,q)
u=new V.eM(o==null?p.b:o,q,t)}++t}}}},eP:{"^":"el;b,0c,0a",
i:function(a){return this.b.b+": "+this.cQ(0)}}}],["","",,X,{"^":"",dT:{"^":"b;",$isaL:1},hR:{"^":"eH;0a,0b,0c,0d,0e,0f,0r,0x",
gB:function(){var z=this.x
if(z==null){z=D.Q()
this.x=z}return z}},iG:{"^":"b;0a,0b,0c,0d,0e",
gB:function(){var z=this.e
if(z==null){z=D.Q()
this.e=z}return z},
aU:[function(a){var z
H.f(a,"$isu")
z=this.e
if(!(z==null))z.G(a)},function(){return this.aU(null)},"ik","$1","$0","gcS",0,2,1],
sb5:function(a){var z,y,x
if(!J.P(this.a,a)){z=this.a
if(z!=null){z=z.gB()
z.toString
y=H.h(this.gcS(),{func:1,ret:-1,args:[D.u]})
C.a.S(z.a,y)}x=this.a
this.a=a
if(a!=null){z=a.gB()
z.toString
y=H.h(this.gcS(),{func:1,ret:-1,args:[D.u]})
C.a.h(z.a,y)}z=new D.H("mover",x,this.a,this,[U.a8])
z.b=!0
this.aU(z)}},
$isaL:1,
$isdT:1},eH:{"^":"b;"}}],["","",,V,{"^":"",
n_:function(a){P.jA(C.G,new V.n0(a))},
n0:{"^":"n:48;a",
$1:function(a){H.f(a,"$isbk")
P.dE(C.h.ed(this.a.ghB(),2)+" fps")}},
iU:{"^":"b;a,b,0c",
di:function(a,b,c,d){var z,y,x,w,v,u,t,s
H.h(c,{func:1,ret:-1})
if(this.c==null)return
z=this.a
y=P.f8().gcC().k(0,H.l(z))
if(y==null)if(d){c.$0()
this.dg(b)
x=!0}else x=!1
else if(y===b){c.$0()
x=!0}else x=!1
w=document
v=w.createElement("label")
u=v.style
u.whiteSpace="nowrap"
J.dJ(this.c).h(0,v)
t=W.hU("radio")
t.checked=x
t.name=z
z=W.ae
W.a4(t,"change",H.h(new V.iV(this,t,c,b),{func:1,ret:-1,args:[z]}),!1,z)
v.appendChild(t)
s=w.createElement("span")
s.textContent=b
v.appendChild(s)
J.dJ(this.c).h(0,w.createElement("br"))},
aW:function(a,b,c){return this.di(a,b,c,!1)},
dg:function(a){var z,y,x,w,v
z=P.f8()
y=P.i
x=P.ia(z.gcC(),y,y)
x.m(0,this.a,a)
w=z.e7(0,x)
y=window.history
v=w.i(0)
y.toString
y.replaceState(new P.lp([],[]).cI(""),"",v)}},
iV:{"^":"n:20;a,b,c,d",
$1:function(a){if(this.b.checked){this.c.$0()
this.a.dg(this.d)}}},
je:{"^":"b;0a,0b",
ex:function(a,b){var z,y,x,w,v,u,t
z=document
y=z.body
x=z.createElement("div")
x.className="scrollTop"
y.appendChild(x)
w=z.createElement("div")
w.className="scrollPage"
y.appendChild(w)
v=z.createElement("div")
v.className="pageCenter"
w.appendChild(v)
if(a.length!==0){z.title=a
u=z.createElement("div")
u.className="pageTitle"
u.textContent=a
v.appendChild(u)}t=z.createElement("div")
this.a=t
v.appendChild(t)
this.b=null
t=W.ae
W.a4(z,"scroll",H.h(new V.jh(x),{func:1,ret:-1,args:[t]}),!1,t)},
hh:function(a){var z,y,x,w,v,u,t,s,r,q,p
H.w(a,"$isc",[P.i],"$asc")
this.fJ()
z=document
y=z.createElement("div")
y.className="textPar"
for(x=this.b.ih(C.a.hH(a)),w=x.length,v=0;v<x.length;x.length===w||(0,H.A)(x),++v){u=x[v]
switch(u.a){case"Bold":t=z.createElement("div")
t.className="boldPar"
t.textContent=u.b
y.appendChild(t)
break
case"Italic":t=z.createElement("div")
t.className="italicPar"
t.textContent=u.b
y.appendChild(t)
break
case"Code":t=z.createElement("div")
t.className="codePar"
t.textContent=u.b
y.appendChild(t)
break
case"Link":s=u.b
if(H.h3(s,"|",0)){r=s.split("|")
q=z.createElement("a")
q.className="linkPar"
if(1>=r.length)return H.d(r,1)
q.href=r[1]
q.textContent=r[0]
y.appendChild(q)}else{p=P.cz(C.R,s,C.k,!1)
q=z.createElement("a")
q.className="linkPar"
q.href="#"+H.l(p)
q.textContent=s
y.appendChild(q)}break
case"Other":t=z.createElement("div")
t.className="normalPar"
t.textContent=u.b
y.appendChild(t)
break}}this.a.appendChild(y)},
hc:function(a){var z,y,x,w,v,u,t
H.w(a,"$isc",[P.i],"$asc")
z=document
y=z.createElement("table")
y.id="shellTable"
x=y.style
x.width="100%"
x.padding="0px"
x.marginLeft="auto"
x.marginRight="auto"
this.a.appendChild(y)
w=y.insertRow(-1)
x=H.f(w.insertCell(-1),"$isdd").style
x.textAlign="center"
x.verticalAlign="top"
x.marginLeft="auto"
x.marginRight="auto"
for(v=0;v<1;++v){u=z.createElement("div")
u.id=a[v]
x=u.style
x.textAlign="left"
x=u.style
x.verticalAlign="top"
t=H.f(w.insertCell(-1),"$isdd")
x=t.style
x.textAlign="center"
x.verticalAlign="top"
x.marginLeft="auto"
x.marginRight="auto"
t.appendChild(u)}},
fJ:function(){var z,y,x,w
if(this.b!=null)return
z=new V.jB()
y=P.i
z.a=new H.aY(0,0,[y,V.eE])
z.b=new H.aY(0,0,[y,V.eN])
z.c=z.R(0,"Start")
y=z.R(0,"Start").E(0,"Bold")
x=V.aa(new H.a5("*"))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"Bold").E(0,"Bold")
x=new V.bI()
w=[V.c4]
x.a=H.e([],w)
C.a.h(y.a,x)
y=V.aa(new H.a5("*"))
C.a.h(x.a,y)
y=z.R(0,"Bold").E(0,"BoldEnd")
x=V.aa(new H.a5("*"))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"Start").E(0,"Italic")
x=V.aa(new H.a5("_"))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"Italic").E(0,"Italic")
x=new V.bI()
x.a=H.e([],w)
C.a.h(y.a,x)
y=V.aa(new H.a5("_"))
C.a.h(x.a,y)
y=z.R(0,"Italic").E(0,"ItalicEnd")
x=V.aa(new H.a5("_"))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"Start").E(0,"Code")
x=V.aa(new H.a5("`"))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"Code").E(0,"Code")
x=new V.bI()
x.a=H.e([],w)
C.a.h(y.a,x)
y=V.aa(new H.a5("`"))
C.a.h(x.a,y)
y=z.R(0,"Code").E(0,"CodeEnd")
x=V.aa(new H.a5("`"))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"Start").E(0,"LinkHead")
x=V.aa(new H.a5("["))
C.a.h(y.a,x)
y.c=!0
y=z.R(0,"LinkHead").E(0,"LinkTail")
x=V.aa(new H.a5("|"))
C.a.h(y.a,x)
x=z.R(0,"LinkHead").E(0,"LinkEnd")
y=V.aa(new H.a5("]"))
C.a.h(x.a,y)
x.c=!0
x=z.R(0,"LinkHead").E(0,"LinkHead")
y=new V.bI()
y.a=H.e([],w)
C.a.h(x.a,y)
x=V.aa(new H.a5("|]"))
C.a.h(y.a,x)
x=z.R(0,"LinkTail").E(0,"LinkEnd")
y=V.aa(new H.a5("]"))
C.a.h(x.a,y)
x.c=!0
x=z.R(0,"LinkTail").E(0,"LinkTail")
y=new V.bI()
y.a=H.e([],w)
C.a.h(x.a,y)
x=V.aa(new H.a5("|]"))
C.a.h(y.a,x)
C.a.h(z.R(0,"Start").E(0,"Other").a,new V.hf())
x=z.R(0,"Other").E(0,"Other")
y=new V.bI()
y.a=H.e([],w)
C.a.h(x.a,y)
x=V.aa(new H.a5("*_`["))
C.a.h(y.a,x)
x=z.R(0,"BoldEnd")
x.d=x.a.bc("Bold")
x=z.R(0,"ItalicEnd")
x.d=x.a.bc("Italic")
x=z.R(0,"CodeEnd")
x.d=x.a.bc("Code")
x=z.R(0,"LinkEnd")
x.d=x.a.bc("Link")
x=z.R(0,"Other")
x.d=x.a.bc("Other")
this.b=z},
p:{
jf:function(a,b){var z=new V.je()
z.ex(a,!0)
return z}}},
jh:{"^":"n:20;a",
$1:function(a){P.jz(C.r,new V.jg(this.a))}},
jg:{"^":"n:0;a",
$0:function(){var z,y,x
z=C.h.ab(document.documentElement.scrollTop)
y=this.a.style
x=H.l(-0.01*z)+"px"
y.top=x}}}],["","",,U,{"^":"",
h_:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=V.jf("Test 020",!0)
y=W.dU(null,null)
y.className="pageLargeCanvas"
y.id="testCanvas"
z.a.appendChild(y)
x=[P.i]
z.hh(H.e(["Test of the Matrial Lighting shader with multiple moving directional lights."],x))
z.hc(H.e(["shapes"],x))
x=document
w=x.getElementById("testCanvas")
if(w==null)H.t(P.v("Failed to find an element with the identifier, testCanvas."))
v=E.jx(w,!0,!0,!0,!1)
z=U.d9(0,0,0.3,0,0,0)
u=D.cU(new V.Z(1,0,0),z)
z=U.d9(0.4,0,0,0,0,0)
t=D.cU(new V.Z(0,1,0),z)
z=U.d9(0.5,0,0.5,0,0,0)
s=D.cU(new V.Z(0,0,1),z)
r=new O.io()
z=O.cR(V.av)
r.e=z
z.bh(r.gf3(),r.gf4())
z=new O.ba(r,"emission")
z.c=C.c
z.f=new V.Z(0,0,0)
r.f=z
z=new O.ba(r,"ambient")
z.c=C.c
z.f=new V.Z(0,0,0)
r.r=z
z=new O.ba(r,"diffuse")
z.c=C.c
z.f=new V.Z(0,0,0)
r.x=z
z=new O.ba(r,"invDiffuse")
z.c=C.c
z.f=new V.Z(0,0,0)
r.y=z
z=new O.iv(r,"specular")
z.c=C.c
z.f=new V.Z(0,0,0)
z.ch=100
r.z=z
z=new O.is(r,"bump")
z.c=C.c
r.Q=z
r.ch=null
z=new O.ba(r,"reflect")
z.c=C.c
z.f=new V.Z(0,0,0)
r.cx=z
z=new O.iu(r,"refract")
z.c=C.c
z.f=new V.Z(0,0,0)
z.ch=1
r.cy=z
z=new O.ir(r,"alpha")
z.c=C.c
z.f=1
r.db=z
z=new D.i3()
z.bM(D.a2)
z.e=H.e([],[D.cj])
z.f=H.e([],[D.iI])
z.r=H.e([],[D.jj])
z.x=H.e([],[D.jt])
z.y=H.e([],[D.ju])
z.z=H.e([],[D.jv])
z.Q=null
z.ch=null
z.cO(z.gf2(),z.gfn(),z.gfp())
r.dx=z
q=z.Q
if(q==null){q=D.Q()
z.Q=q
z=q}else z=q
q={func:1,ret:-1,args:[D.u]}
p=H.h(r.gfB(),q)
C.a.h(z.a,p)
p=r.dx
z=p.ch
if(z==null){z=D.Q()
p.ch=z}p=H.h(r.gf6(),q)
C.a.h(z.a,p)
r.dy=null
r.dx.h(0,u)
r.dx.h(0,t)
r.dx.h(0,s)
r.f.sah(0,new V.Z(0,0,0))
p=r.r
p.sah(0,new V.Z(0.1,0.1,0.1))
z=r.x
z.sah(0,new V.Z(0.7,0.7,0.7))
z=r.z
z.sah(0,new V.Z(0.3,0.3,0.3))
z=r.z
if(z.c===C.c){z.c=C.i
z.bL()
z.c2(100)
p=z.a
p.a=null
p.af(null)}z.c2(100)
o=E.e6(null,!0,null,"",null,null)
o.sad(0,F.h6(30,1,15,0.5))
n=E.e6(null,!0,null,"",null,null)
n.sb5(U.dY(V.ep(3,3,3,1)))
z=F.dx(1,null,null,1)
z.b_()
n.sad(0,z)
m=new U.e9()
m.bM(U.a8)
m.bh(m.gf1(),m.gfo())
m.e=null
m.f=V.c5()
m.r=0
z=v.r
p=new U.k1()
l=U.cS()
l.scJ(0,!0)
l.scu(6.283185307179586)
l.scw(0)
l.sa_(0,0)
l.scv(100)
l.sV(0)
l.sci(0.5)
p.b=l
l=l.gB()
l.toString
k=H.h(p.gaE(),q)
C.a.h(l.a,k)
l=U.cS()
l.scJ(0,!0)
l.scu(6.283185307179586)
l.scw(0)
l.sa_(0,0)
l.scv(100)
l.sV(0)
l.sci(0.5)
p.c=l
C.a.h(l.gB().a,k)
p.d=null
p.e=!1
p.f=!1
p.r=!1
p.x=2.5
p.y=2.5
p.z=2
p.Q=4
p.cx=!1
p.ch=!1
p.cy=0
p.db=0
p.dx=null
p.dy=0
p.fr=null
p.fx=null
j=new X.aC(!1,!1,!1)
i=p.d
p.d=j
l=[X.aC]
k=new D.H("modifiers",i,j,p,l)
k.b=!0
p.K(k)
k=p.f
if(k!==!1){p.f=!1
k=new D.H("invertX",k,!1,p,[P.ai])
k.b=!0
p.K(k)}k=p.r
if(k!==!1){p.r=!1
k=new D.H("invertY",k,!1,p,[P.ai])
k.b=!0
p.K(k)}p.aX(z)
m.h(0,p)
z=v.r
p=new U.k0()
k=U.cS()
k.scJ(0,!0)
k.scu(6.283185307179586)
k.scw(0)
k.sa_(0,0)
k.scv(100)
k.sV(0)
k.sci(0.2)
p.b=k
k=k.gB()
k.toString
h=H.h(p.gaE(),q)
C.a.h(k.a,h)
p.c=null
p.d=!1
p.e=2.5
p.f=2
p.r=4
p.y=!1
p.x=!1
p.z=0
p.Q=null
p.ch=0
p.cx=null
p.cy=null
j=new X.aC(!0,!1,!1)
i=p.c
p.c=j
k=new D.H("modifiers",i,j,p,l)
k.b=!0
p.K(k)
p.aX(z)
m.h(0,p)
z=v.r
p=new U.k2()
p.c=0.01
p.d=0
p.e=0
j=new X.aC(!1,!1,!1)
p.b=j
l=new D.H("modifiers",null,j,p,l)
l.b=!0
p.K(l)
p.aX(z)
m.h(0,p)
m.h(0,U.dY(V.aB(1,0,0,0,0,1,0,0,0,0,1,5,0,0,0,1)))
z=new M.hJ()
p=O.cR(E.aK)
z.d=p
p.bh(z.gf7(),z.gf8())
z.e=null
z.f=null
z.r=null
z.x=null
g=new X.iG()
g.b=1.0471975511965976
g.c=0.1
g.d=2000
g.sb5(null)
p=g.b
if(!$.o.$2(p,1.0471975511965976)){i=g.b
g.b=1.0471975511965976
p=new D.H("fov",i,1.0471975511965976,g,[P.q])
p.b=!0
g.aU(p)}p=g.c
if(!$.o.$2(p,0.1)){i=g.c
g.c=0.1
p=new D.H("near",i,0.1,g,[P.q])
p.b=!0
g.aU(p)}p=g.d
if(!$.o.$2(p,2000)){i=g.d
g.d=2000
p=new D.H("far",i,2000,g,[P.q])
p.b=!0
g.aU(p)}p=z.a
if(p!==g){if(p!=null){p=p.gB()
p.toString
l=H.h(z.gak(),q)
C.a.S(p.a,l)}i=z.a
z.a=g
p=g.gB()
p.toString
l=H.h(z.gak(),q)
C.a.h(p.a,l)
p=new D.H("camera",i,z.a,z,[X.dT])
p.b=!0
z.aF(p)}f=new X.hR()
p=new V.b3(0,0,0,1)
f.a=p
f.b=!0
f.c=2000
f.d=!0
f.e=0
f.f=!1
p=V.ey(0,0,1,1)
f.r=p
p=z.b
if(p!==f){if(p!=null){p=p.gB()
p.toString
l=H.h(z.gak(),q)
C.a.S(p.a,l)}i=z.b
z.b=f
p=f.gB()
p.toString
l=H.h(z.gak(),q)
C.a.h(p.a,l)
p=new D.H("target",i,z.b,z,[X.eH])
p.b=!0
z.aF(p)}z.sea(null)
z.sea(r)
z.d.h(0,o)
z.d.h(0,n)
z.a.sb5(m)
p=v.d
if(p!==z){if(p!=null){p=p.gB()
p.toString
l=H.h(v.gcR(),q)
C.a.S(p.a,l)}v.d=z
z=z.gB()
z.toString
q=H.h(v.gcR(),q)
C.a.h(z.a,q)
v.eA()}z=new V.iU("shapes",!0)
x=x.getElementById("shapes")
z.c=x
if(x==null)H.t("Failed to find shapes for RadioGroup")
z.aW(0,"Cube",new U.mO(o))
z.aW(0,"Cylinder",new U.mP(o))
z.aW(0,"Cone",new U.mQ(o))
z.aW(0,"Sphere",new U.mR(o))
z.di(0,"Toroid",new U.mS(o),!0)
z.aW(0,"Knot",new U.mT(o))
V.n_(v)},
mO:{"^":"n:0;a",
$0:function(){this.a.sad(0,F.dx(1,null,null,1))}},
mP:{"^":"n:0;a",
$0:function(){this.a.sad(0,F.fQ(1,!0,!0,1,40,1))}},
mQ:{"^":"n:0;a",
$0:function(){this.a.sad(0,F.fQ(1,!0,!1,1,40,0))}},
mR:{"^":"n:0;a",
$0:function(){this.a.sad(0,F.n1(6,null,6))}},
mS:{"^":"n:0;a",
$0:function(){this.a.sad(0,F.h6(30,1,15,0.5))}},
mT:{"^":"n:0;a",
$0:function(){this.a.sad(0,F.mL(120,1,2,12,0.3,3))}}},1]]
setupProgram(dart,0,0)
J.O=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ed.prototype
return J.hZ.prototype}if(typeof a=="string")return J.c2.prototype
if(a==null)return J.ee.prototype
if(typeof a=="boolean")return J.hY.prototype
if(a.constructor==Array)return J.b9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c3.prototype
return a}if(a instanceof P.b)return a
return J.cE(a)}
J.aH=function(a){if(typeof a=="string")return J.c2.prototype
if(a==null)return a
if(a.constructor==Array)return J.b9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c3.prototype
return a}if(a instanceof P.b)return a
return J.cE(a)}
J.cb=function(a){if(a==null)return a
if(a.constructor==Array)return J.b9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c3.prototype
return a}if(a instanceof P.b)return a
return J.cE(a)}
J.mB=function(a){if(typeof a=="number")return J.c1.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.c8.prototype
return a}
J.mC=function(a){if(typeof a=="number")return J.c1.prototype
if(typeof a=="string")return J.c2.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.c8.prototype
return a}
J.dA=function(a){if(typeof a=="string")return J.c2.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.c8.prototype
return a}
J.aW=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.c3.prototype
return a}if(a instanceof P.b)return a
return J.cE(a)}
J.P=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.O(a).u(a,b)}
J.h7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.mB(a).O(a,b)}
J.dG=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.mC(a).j(a,b)}
J.dH=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.fX(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aH(a).k(a,b)}
J.cJ=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.fX(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.cb(a).m(a,b,c)}
J.h8=function(a,b){return J.dA(a).H(a,b)}
J.h9=function(a,b,c){return J.aW(a).fz(a,b,c)}
J.ha=function(a,b,c,d){return J.aW(a).dj(a,b,c,d)}
J.hb=function(a,b){return J.dA(a).X(a,b)}
J.cK=function(a,b,c){return J.aH(a).ho(a,b,c)}
J.cL=function(a,b){return J.cb(a).J(a,b)}
J.hc=function(a,b,c,d){return J.cb(a).az(a,b,c,d)}
J.dI=function(a,b){return J.cb(a).L(a,b)}
J.dJ=function(a){return J.aW(a).gce(a)}
J.b2=function(a){return J.O(a).gU(a)}
J.by=function(a){return J.cb(a).ga0(a)}
J.au=function(a){return J.aH(a).gl(a)}
J.hd=function(a,b){return J.aW(a).i6(a,b)}
J.he=function(a,b){return J.aW(a).sa1(a,b)}
J.ab=function(a){return J.O(a).i(a)}
I.ak=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.l=W.cQ.prototype
C.H=J.r.prototype
C.a=J.b9.prototype
C.d=J.ed.prototype
C.t=J.ee.prototype
C.h=J.c1.prototype
C.b=J.c2.prototype
C.O=J.c3.prototype
C.U=H.d7.prototype
C.V=W.iC.prototype
C.z=J.iH.prototype
C.q=J.c8.prototype
C.A=W.bQ.prototype
C.B=W.kp.prototype
C.D=new P.hk(!1)
C.C=new P.hj(C.D)
C.E=new P.iF()
C.F=new P.ka()
C.j=new P.lb()
C.c=new A.ch(0,"ColorSourceType.None")
C.i=new A.ch(1,"ColorSourceType.Solid")
C.e=new A.ch(2,"ColorSourceType.Texture2D")
C.f=new A.ch(3,"ColorSourceType.TextureCube")
C.r=new P.b6(0)
C.G=new P.b6(5e6)
C.I=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.J=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.u=function(hooks) { return hooks; }

C.K=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.L=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.M=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.N=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.v=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=H.e(I.ak([127,2047,65535,1114111]),[P.m])
C.m=H.e(I.ak([0,0,32776,33792,1,10240,0,0]),[P.m])
C.n=H.e(I.ak([0,0,65490,45055,65535,34815,65534,18431]),[P.m])
C.o=H.e(I.ak([0,0,26624,1023,65534,2047,65534,2047]),[P.m])
C.Q=H.e(I.ak([0,0,32722,12287,65534,34815,65534,18431]),[P.m])
C.R=H.e(I.ak([0,0,65498,45055,65535,34815,65534,18431]),[P.m])
C.p=H.e(I.ak([0,0,24576,1023,65534,34815,65534,18431]),[P.m])
C.x=H.e(I.ak([0,0,32754,11263,65534,34815,65534,18431]),[P.m])
C.S=H.e(I.ak([0,0,32722,12287,65535,34815,65534,18431]),[P.m])
C.y=H.e(I.ak([0,0,65490,12287,65535,34815,65534,18431]),[P.m])
C.P=H.e(I.ak([]),[P.i])
C.T=new H.hw(0,{},C.P,[P.i,P.i])
C.k=new P.k3(!1)
$.aA=0
$.bz=null
$.dO=null
$.ds=!1
$.fV=null
$.fM=null
$.h2=null
$.cD=null
$.cG=null
$.dB=null
$.br=null
$.bW=null
$.bX=null
$.dt=!1
$.T=C.j
$.e3=null
$.e2=null
$.e1=null
$.e0=null
$.o=V.iw()
$.eu=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["e_","$get$e_",function(){return H.fU("_$dart_dartClosure")},"cY","$get$cY",function(){return H.fU("_$dart_js")},"eQ","$get$eQ",function(){return H.aE(H.cv({
toString:function(){return"$receiver$"}}))},"eR","$get$eR",function(){return H.aE(H.cv({$method$:null,
toString:function(){return"$receiver$"}}))},"eS","$get$eS",function(){return H.aE(H.cv(null))},"eT","$get$eT",function(){return H.aE(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"eX","$get$eX",function(){return H.aE(H.cv(void 0))},"eY","$get$eY",function(){return H.aE(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"eV","$get$eV",function(){return H.aE(H.eW(null))},"eU","$get$eU",function(){return H.aE(function(){try{null.$method$}catch(z){return z.message}}())},"f_","$get$f_",function(){return H.aE(H.eW(void 0))},"eZ","$get$eZ",function(){return H.aE(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dm","$get$dm",function(){return P.kq()},"bY","$get$bY",function(){return[]},"fb","$get$fb",function(){return P.k7()},"fh","$get$fh",function(){return H.iA(H.bq(H.e([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],[P.m])))},"fC","$get$fC",function(){return P.j_("^[\\-\\.0-9A-Z_a-z~]*$",!0,!1)},"fI","$get$fI",function(){return P.ma()},"dZ","$get$dZ",function(){return{}},"fe","$get$fe",function(){return Z.ar(0)},"fc","$get$fc",function(){return Z.ar(511)},"aR","$get$aR",function(){return Z.ar(1)},"aQ","$get$aQ",function(){return Z.ar(2)},"aP","$get$aP",function(){return Z.ar(4)},"aS","$get$aS",function(){return Z.ar(8)},"aT","$get$aT",function(){return Z.ar(16)},"bO","$get$bO",function(){return Z.ar(32)},"bP","$get$bP",function(){return Z.ar(64)},"fd","$get$fd",function(){return Z.ar(96)},"bo","$get$bo",function(){return Z.ar(128)},"aO","$get$aO",function(){return Z.ar(256)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.G},{func:1,ret:-1,opt:[D.u]},{func:1,ret:-1,args:[D.u]},{func:1,ret:-1},{func:1,ret:-1,args:[W.ae]},{func:1,ret:-1,args:[W.aD]},{func:1,ret:P.G,args:[,,]},{func:1,ret:-1,args:[P.i,,]},{func:1,ret:-1,args:[P.m,[P.k,E.aK]]},{func:1,ret:P.G,args:[F.ag,P.q,P.q]},{func:1,ret:P.G,args:[F.an]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:P.G,args:[D.u]},{func:1,ret:-1,args:[W.bm]},{func:1,ret:P.q,args:[P.q,P.q]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[,]},{func:1,ret:-1,args:[P.i,P.i]},{func:1,ret:-1,args:[P.m,[P.k,D.a2]]},{func:1,ret:-1,args:[W.bF]},{func:1,ret:P.G,args:[W.ae]},{func:1,ret:-1,args:[P.m,[P.k,V.av]]},{func:1,ret:V.a3,args:[P.q]},{func:1,ret:-1,args:[P.m,[P.k,U.a8]]},{func:1,ret:P.q},{func:1,ret:P.i,args:[P.m]},{func:1,ret:P.G,args:[,]},{func:1,ret:W.a1,args:[W.K]},{func:1,args:[P.i]},{func:1,ret:-1,args:[P.b],opt:[P.aw]},{func:1,ret:-1,args:[P.i,P.m]},{func:1,ret:P.G,args:[P.X]},{func:1,ret:P.G,args:[{func:1,ret:-1,args:[D.u]}]},{func:1,ret:P.ai,args:[P.q,P.q]},{func:1,ret:[P.aU,,],args:[,]},{func:1,ret:-1,args:[W.bQ]},{func:1,ret:P.G,args:[{func:1,ret:-1}]},{func:1,ret:P.ai,args:[[P.k,D.a2]]},{func:1,ret:[P.J,P.i,P.i],args:[[P.J,P.i,P.i],P.i]},{func:1,args:[,P.i]},{func:1,ret:P.R,args:[,,]},{func:1,ret:P.m,args:[[P.c,P.m],P.m]},{func:1,ret:-1,args:[P.m,P.m]},{func:1,ret:P.m,args:[P.m,P.m]},{func:1,ret:P.ai,args:[W.K]},{func:1,ret:P.R,args:[P.m]},{func:1,ret:P.i,args:[P.i]},{func:1,ret:P.G,args:[P.i]},{func:1,ret:P.G,args:[P.bk]},{func:1,ret:-1,args:[P.i],opt:[,]},{func:1,ret:P.G,args:[P.i,,]},{func:1,ret:P.G,args:[,],opt:[,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.n4(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.ak=a.ak
Isolate.dy=a.dy
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(U.h_,[])
else U.h_([])})})()
//# sourceMappingURL=test.dart.js.map
