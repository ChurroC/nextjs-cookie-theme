#! /usr/bin/env node
import t from"events";import e from"child_process";import i from"path";import n from"fs";import r from"process";import s from"fs/promises";function o(t,e,i,n){return new(i||(i=Promise))((function(r,s){function o(t){try{h(n.next(t))}catch(t){s(t)}}function a(t){try{h(n.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((n=n.apply(t,e||[])).next())}))}function a(t,e){var i,n,r,s,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(a){return function(h){return function(a){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,a[0]&&(o=0)),o;)try{if(i=1,n&&(r=2&a[0]?n.return:a[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,a[1])).done)return r;switch(n=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(t){a=[6,t],n=0}finally{i=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,h])}}}"function"==typeof SuppressedError&&SuppressedError;var h={},l={},c={};let u=class extends Error{constructor(t,e,i){super(i),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=e,this.exitCode=t,this.nestedError=void 0}};c.CommanderError=u,c.InvalidArgumentError=class extends u{constructor(t){super(1,"commander.invalidArgument",t),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name}};const{InvalidArgumentError:p}=c;l.Argument=class{constructor(t,e){switch(this.description=e||"",this.variadic=!1,this.parseArg=void 0,this.defaultValue=void 0,this.defaultValueDescription=void 0,this.argChoices=void 0,t[0]){case"<":this.required=!0,this._name=t.slice(1,-1);break;case"[":this.required=!1,this._name=t.slice(1,-1);break;default:this.required=!0,this._name=t}this._name.length>3&&"..."===this._name.slice(-3)&&(this.variadic=!0,this._name=this._name.slice(0,-3))}name(){return this._name}_concatValue(t,e){return e!==this.defaultValue&&Array.isArray(e)?e.concat(t):[t]}default(t,e){return this.defaultValue=t,this.defaultValueDescription=e,this}argParser(t){return this.parseArg=t,this}choices(t){return this.argChoices=t.slice(),this.parseArg=(t,e)=>{if(!this.argChoices.includes(t))throw new p(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,e):t},this}argRequired(){return this.required=!0,this}argOptional(){return this.required=!1,this}},l.humanReadableArgName=function(t){const e=t.name()+(!0===t.variadic?"...":"");return t.required?"<"+e+">":"["+e+"]"};var m={},d={};const{humanReadableArgName:g}=l;d.Help=class{constructor(){this.helpWidth=void 0,this.sortSubcommands=!1,this.sortOptions=!1,this.showGlobalOptions=!1}visibleCommands(t){const e=t.commands.filter((t=>!t._hidden)),i=t._getHelpCommand();return i&&!i._hidden&&e.push(i),this.sortSubcommands&&e.sort(((t,e)=>t.name().localeCompare(e.name()))),e}compareOptions(t,e){const i=t=>t.short?t.short.replace(/^-/,""):t.long.replace(/^--/,"");return i(t).localeCompare(i(e))}visibleOptions(t){const e=t.options.filter((t=>!t.hidden)),i=t._getHelpOption();if(i&&!i.hidden){const n=i.short&&t._findOption(i.short),r=i.long&&t._findOption(i.long);n||r?i.long&&!r?e.push(t.createOption(i.long,i.description)):i.short&&!n&&e.push(t.createOption(i.short,i.description)):e.push(i)}return this.sortOptions&&e.sort(this.compareOptions),e}visibleGlobalOptions(t){if(!this.showGlobalOptions)return[];const e=[];for(let i=t.parent;i;i=i.parent){const t=i.options.filter((t=>!t.hidden));e.push(...t)}return this.sortOptions&&e.sort(this.compareOptions),e}visibleArguments(t){return t._argsDescription&&t.registeredArguments.forEach((e=>{e.description=e.description||t._argsDescription[e.name()]||""})),t.registeredArguments.find((t=>t.description))?t.registeredArguments:[]}subcommandTerm(t){const e=t.registeredArguments.map((t=>g(t))).join(" ");return t._name+(t._aliases[0]?"|"+t._aliases[0]:"")+(t.options.length?" [options]":"")+(e?" "+e:"")}optionTerm(t){return t.flags}argumentTerm(t){return t.name()}longestSubcommandTermLength(t,e){return e.visibleCommands(t).reduce(((t,i)=>Math.max(t,e.subcommandTerm(i).length)),0)}longestOptionTermLength(t,e){return e.visibleOptions(t).reduce(((t,i)=>Math.max(t,e.optionTerm(i).length)),0)}longestGlobalOptionTermLength(t,e){return e.visibleGlobalOptions(t).reduce(((t,i)=>Math.max(t,e.optionTerm(i).length)),0)}longestArgumentTermLength(t,e){return e.visibleArguments(t).reduce(((t,i)=>Math.max(t,e.argumentTerm(i).length)),0)}commandUsage(t){let e=t._name;t._aliases[0]&&(e=e+"|"+t._aliases[0]);let i="";for(let e=t.parent;e;e=e.parent)i=e.name()+" "+i;return i+e+" "+t.usage()}commandDescription(t){return t.description()}subcommandDescription(t){return t.summary()||t.description()}optionDescription(t){const e=[];if(t.argChoices&&e.push(`choices: ${t.argChoices.map((t=>JSON.stringify(t))).join(", ")}`),void 0!==t.defaultValue){(t.required||t.optional||t.isBoolean()&&"boolean"==typeof t.defaultValue)&&e.push(`default: ${t.defaultValueDescription||JSON.stringify(t.defaultValue)}`)}return void 0!==t.presetArg&&t.optional&&e.push(`preset: ${JSON.stringify(t.presetArg)}`),void 0!==t.envVar&&e.push(`env: ${t.envVar}`),e.length>0?`${t.description} (${e.join(", ")})`:t.description}argumentDescription(t){const e=[];if(t.argChoices&&e.push(`choices: ${t.argChoices.map((t=>JSON.stringify(t))).join(", ")}`),void 0!==t.defaultValue&&e.push(`default: ${t.defaultValueDescription||JSON.stringify(t.defaultValue)}`),e.length>0){const i=`(${e.join(", ")})`;return t.description?`${t.description} ${i}`:i}return t.description}formatHelp(t,e){const i=e.padWidth(t,e),n=e.helpWidth||80;function r(t,r){if(r){const s=`${t.padEnd(i+2)}${r}`;return e.wrap(s,n-2,i+2)}return t}function s(t){return t.join("\n").replace(/^/gm," ".repeat(2))}let o=[`Usage: ${e.commandUsage(t)}`,""];const a=e.commandDescription(t);a.length>0&&(o=o.concat([e.wrap(a,n,0),""]));const h=e.visibleArguments(t).map((t=>r(e.argumentTerm(t),e.argumentDescription(t))));h.length>0&&(o=o.concat(["Arguments:",s(h),""]));const l=e.visibleOptions(t).map((t=>r(e.optionTerm(t),e.optionDescription(t))));if(l.length>0&&(o=o.concat(["Options:",s(l),""])),this.showGlobalOptions){const i=e.visibleGlobalOptions(t).map((t=>r(e.optionTerm(t),e.optionDescription(t))));i.length>0&&(o=o.concat(["Global Options:",s(i),""]))}const c=e.visibleCommands(t).map((t=>r(e.subcommandTerm(t),e.subcommandDescription(t))));return c.length>0&&(o=o.concat(["Commands:",s(c),""])),o.join("\n")}padWidth(t,e){return Math.max(e.longestOptionTermLength(t,e),e.longestGlobalOptionTermLength(t,e),e.longestSubcommandTermLength(t,e),e.longestArgumentTermLength(t,e))}wrap(t,e,i,n=40){const r=new RegExp("[\\n][ \\f\\t\\v   -   　\ufeff]+");if(t.match(r))return t;const s=e-i;if(s<n)return t;const o=t.slice(0,i),a=t.slice(i).replace("\r\n","\n"),h=" ".repeat(i),l="\\s​",c=new RegExp(`\n|.{1,${s-1}}([${l}]|$)|[^${l}]+?([${l}]|$)`,"g");return o+(a.match(c)||[]).map(((t,e)=>"\n"===t?"":(e>0?h:"")+t.trimEnd())).join("\n")}};var f={};const{InvalidArgumentError:_}=c;f.Option=class{constructor(t,e){this.flags=t,this.description=e||"",this.required=t.includes("<"),this.optional=t.includes("["),this.variadic=/\w\.\.\.[>\]]$/.test(t),this.mandatory=!1;const i=function(t){let e,i;const n=t.split(/[ |,]+/);n.length>1&&!/^[[<]/.test(n[1])&&(e=n.shift());i=n.shift(),!e&&/^-[^-]$/.test(i)&&(e=i,i=void 0);return{shortFlag:e,longFlag:i}}(t);this.short=i.shortFlag,this.long=i.longFlag,this.negate=!1,this.long&&(this.negate=this.long.startsWith("--no-")),this.defaultValue=void 0,this.defaultValueDescription=void 0,this.presetArg=void 0,this.envVar=void 0,this.parseArg=void 0,this.hidden=!1,this.argChoices=void 0,this.conflictsWith=[],this.implied=void 0}default(t,e){return this.defaultValue=t,this.defaultValueDescription=e,this}preset(t){return this.presetArg=t,this}conflicts(t){return this.conflictsWith=this.conflictsWith.concat(t),this}implies(t){let e=t;return"string"==typeof t&&(e={[t]:!0}),this.implied=Object.assign(this.implied||{},e),this}env(t){return this.envVar=t,this}argParser(t){return this.parseArg=t,this}makeOptionMandatory(t=!0){return this.mandatory=!!t,this}hideHelp(t=!0){return this.hidden=!!t,this}_concatValue(t,e){return e!==this.defaultValue&&Array.isArray(e)?e.concat(t):[t]}choices(t){return this.argChoices=t.slice(),this.parseArg=(t,e)=>{if(!this.argChoices.includes(t))throw new _(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,e):t},this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return this.name().replace(/^no-/,"").split("-").reduce(((t,e)=>t+e[0].toUpperCase()+e.slice(1)))}is(t){return this.short===t||this.long===t}isBoolean(){return!this.required&&!this.optional&&!this.negate}},f.DualOptions=class{constructor(t){this.positiveOptions=new Map,this.negativeOptions=new Map,this.dualOptions=new Set,t.forEach((t=>{t.negate?this.negativeOptions.set(t.attributeName(),t):this.positiveOptions.set(t.attributeName(),t)})),this.negativeOptions.forEach(((t,e)=>{this.positiveOptions.has(e)&&this.dualOptions.add(e)}))}valueFromOption(t,e){const i=e.attributeName();if(!this.dualOptions.has(i))return!0;const n=this.negativeOptions.get(i).presetArg,r=void 0!==n&&n;return e.negate===(r===t)}};var O={};const v=3;O.suggestSimilar=function(t,e){if(!e||0===e.length)return"";e=Array.from(new Set(e));const i=t.startsWith("--");i&&(t=t.slice(2),e=e.map((t=>t.slice(2))));let n=[],r=v;return e.forEach((e=>{if(e.length<=1)return;const i=function(t,e){if(Math.abs(t.length-e.length)>v)return Math.max(t.length,e.length);const i=[];for(let e=0;e<=t.length;e++)i[e]=[e];for(let t=0;t<=e.length;t++)i[0][t]=t;for(let n=1;n<=e.length;n++)for(let r=1;r<=t.length;r++){let s=1;s=t[r-1]===e[n-1]?0:1,i[r][n]=Math.min(i[r-1][n]+1,i[r][n-1]+1,i[r-1][n-1]+s),r>1&&n>1&&t[r-1]===e[n-2]&&t[r-2]===e[n-1]&&(i[r][n]=Math.min(i[r][n],i[r-2][n-2]+1))}return i[t.length][e.length]}(t,e),s=Math.max(t.length,e.length);(s-i)/s>.4&&(i<r?(r=i,n=[e]):i===r&&n.push(e))})),n.sort(((t,e)=>t.localeCompare(e))),i&&(n=n.map((t=>`--${t}`))),n.length>1?`\n(Did you mean one of ${n.join(", ")}?)`:1===n.length?`\n(Did you mean ${n[0]}?)`:""};const b=t.EventEmitter,A=e,C=i,w=n,y=r,{Argument:E,humanReadableArgName:$}=l,{CommanderError:x}=c,{Help:H}=d,{Option:k,DualOptions:V}=f,{suggestSimilar:S}=O;function T(t){return t.map((t=>{if(!t.startsWith("--inspect"))return t;let e,i,n="127.0.0.1",r="9229";return null!==(i=t.match(/^(--inspect(-brk)?)$/))?e=i[1]:null!==(i=t.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))?(e=i[1],/^\d+$/.test(i[3])?r=i[3]:n=i[3]):null!==(i=t.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))&&(e=i[1],n=i[3],r=i[4]),e&&"0"!==r?`${e}=${n}:${parseInt(r)+1}`:t}))}m.Command=class t extends b{constructor(t){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._allowExcessArguments=!0,this.registeredArguments=[],this._args=this.registeredArguments,this.args=[],this.rawArgs=[],this.processedArgs=[],this._scriptPath=null,this._name=t||"",this._optionValues={},this._optionValueSources={},this._storeOptionsAsProperties=!1,this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._executableDir=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._combineFlagAndOptionalValue=!0,this._description="",this._summary="",this._argsDescription=void 0,this._enablePositionalOptions=!1,this._passThroughOptions=!1,this._lifeCycleHooks={},this._showHelpAfterError=!1,this._showSuggestionAfterError=!0,this._outputConfiguration={writeOut:t=>y.stdout.write(t),writeErr:t=>y.stderr.write(t),getOutHelpWidth:()=>y.stdout.isTTY?y.stdout.columns:void 0,getErrHelpWidth:()=>y.stderr.isTTY?y.stderr.columns:void 0,outputError:(t,e)=>e(t)},this._hidden=!1,this._helpOption=void 0,this._addImplicitHelpCommand=void 0,this._helpCommand=void 0,this._helpConfiguration={}}copyInheritedSettings(t){return this._outputConfiguration=t._outputConfiguration,this._helpOption=t._helpOption,this._helpCommand=t._helpCommand,this._helpConfiguration=t._helpConfiguration,this._exitCallback=t._exitCallback,this._storeOptionsAsProperties=t._storeOptionsAsProperties,this._combineFlagAndOptionalValue=t._combineFlagAndOptionalValue,this._allowExcessArguments=t._allowExcessArguments,this._enablePositionalOptions=t._enablePositionalOptions,this._showHelpAfterError=t._showHelpAfterError,this._showSuggestionAfterError=t._showSuggestionAfterError,this}_getCommandAndAncestors(){const t=[];for(let e=this;e;e=e.parent)t.push(e);return t}command(t,e,i){let n=e,r=i;"object"==typeof n&&null!==n&&(r=n,n=null),r=r||{};const[,s,o]=t.match(/([^ ]+) *(.*)/),a=this.createCommand(s);return n&&(a.description(n),a._executableHandler=!0),r.isDefault&&(this._defaultCommandName=a._name),a._hidden=!(!r.noHelp&&!r.hidden),a._executableFile=r.executableFile||null,o&&a.arguments(o),this._registerCommand(a),a.parent=this,a.copyInheritedSettings(this),n?this:a}createCommand(e){return new t(e)}createHelp(){return Object.assign(new H,this.configureHelp())}configureHelp(t){return void 0===t?this._helpConfiguration:(this._helpConfiguration=t,this)}configureOutput(t){return void 0===t?this._outputConfiguration:(Object.assign(this._outputConfiguration,t),this)}showHelpAfterError(t=!0){return"string"!=typeof t&&(t=!!t),this._showHelpAfterError=t,this}showSuggestionAfterError(t=!0){return this._showSuggestionAfterError=!!t,this}addCommand(t,e){if(!t._name)throw new Error("Command passed to .addCommand() must have a name\n- specify the name in Command constructor or using .name()");return(e=e||{}).isDefault&&(this._defaultCommandName=t._name),(e.noHelp||e.hidden)&&(t._hidden=!0),this._registerCommand(t),t.parent=this,t._checkForBrokenPassThrough(),this}createArgument(t,e){return new E(t,e)}argument(t,e,i,n){const r=this.createArgument(t,e);return"function"==typeof i?r.default(n).argParser(i):r.default(i),this.addArgument(r),this}arguments(t){return t.trim().split(/ +/).forEach((t=>{this.argument(t)})),this}addArgument(t){const e=this.registeredArguments.slice(-1)[0];if(e&&e.variadic)throw new Error(`only the last argument can be variadic '${e.name()}'`);if(t.required&&void 0!==t.defaultValue&&void 0===t.parseArg)throw new Error(`a default value for a required argument is never used: '${t.name()}'`);return this.registeredArguments.push(t),this}helpCommand(t,e){if("boolean"==typeof t)return this._addImplicitHelpCommand=t,this;t=t??"help [command]";const[,i,n]=t.match(/([^ ]+) *(.*)/),r=e??"display help for command",s=this.createCommand(i);return s.helpOption(!1),n&&s.arguments(n),r&&s.description(r),this._addImplicitHelpCommand=!0,this._helpCommand=s,this}addHelpCommand(t,e){return"object"!=typeof t?(this.helpCommand(t,e),this):(this._addImplicitHelpCommand=!0,this._helpCommand=t,this)}_getHelpCommand(){return this._addImplicitHelpCommand??(this.commands.length&&!this._actionHandler&&!this._findCommand("help"))?(void 0===this._helpCommand&&this.helpCommand(void 0,void 0),this._helpCommand):null}hook(t,e){const i=["preSubcommand","preAction","postAction"];if(!i.includes(t))throw new Error(`Unexpected value for event passed to hook : '${t}'.\nExpecting one of '${i.join("', '")}'`);return this._lifeCycleHooks[t]?this._lifeCycleHooks[t].push(e):this._lifeCycleHooks[t]=[e],this}exitOverride(t){return this._exitCallback=t||(t=>{if("commander.executeSubCommandAsync"!==t.code)throw t}),this}_exit(t,e,i){this._exitCallback&&this._exitCallback(new x(t,e,i)),y.exit(t)}action(t){return this._actionHandler=e=>{const i=this.registeredArguments.length,n=e.slice(0,i);return this._storeOptionsAsProperties?n[i]=this:n[i]=this.opts(),n.push(this),t.apply(this,n)},this}createOption(t,e){return new k(t,e)}_callParseArg(t,e,i,n){try{return t.parseArg(e,i)}catch(t){if("commander.invalidArgument"===t.code){const e=`${n} ${t.message}`;this.error(e,{exitCode:t.exitCode,code:t.code})}throw t}}_registerOption(t){const e=t.short&&this._findOption(t.short)||t.long&&this._findOption(t.long);if(e){const i=t.long&&this._findOption(t.long)?t.long:t.short;throw new Error(`Cannot add option '${t.flags}'${this._name&&` to command '${this._name}'`} due to conflicting flag '${i}'\n-  already used by option '${e.flags}'`)}this.options.push(t)}_registerCommand(t){const e=t=>[t.name()].concat(t.aliases()),i=e(t).find((t=>this._findCommand(t)));if(i){const n=e(this._findCommand(i)).join("|"),r=e(t).join("|");throw new Error(`cannot add command '${r}' as already have command '${n}'`)}this.commands.push(t)}addOption(t){this._registerOption(t);const e=t.name(),i=t.attributeName();if(t.negate){const e=t.long.replace(/^--no-/,"--");this._findOption(e)||this.setOptionValueWithSource(i,void 0===t.defaultValue||t.defaultValue,"default")}else void 0!==t.defaultValue&&this.setOptionValueWithSource(i,t.defaultValue,"default");const n=(e,n,r)=>{null==e&&void 0!==t.presetArg&&(e=t.presetArg);const s=this.getOptionValue(i);null!==e&&t.parseArg?e=this._callParseArg(t,e,s,n):null!==e&&t.variadic&&(e=t._concatValue(e,s)),null==e&&(e=!t.negate&&(!(!t.isBoolean()&&!t.optional)||"")),this.setOptionValueWithSource(i,e,r)};return this.on("option:"+e,(e=>{const i=`error: option '${t.flags}' argument '${e}' is invalid.`;n(e,i,"cli")})),t.envVar&&this.on("optionEnv:"+e,(e=>{const i=`error: option '${t.flags}' value '${e}' from env '${t.envVar}' is invalid.`;n(e,i,"env")})),this}_optionEx(t,e,i,n,r){if("object"==typeof e&&e instanceof k)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");const s=this.createOption(e,i);if(s.makeOptionMandatory(!!t.mandatory),"function"==typeof n)s.default(r).argParser(n);else if(n instanceof RegExp){const t=n;n=(e,i)=>{const n=t.exec(e);return n?n[0]:i},s.default(r).argParser(n)}else s.default(n);return this.addOption(s)}option(t,e,i,n){return this._optionEx({},t,e,i,n)}requiredOption(t,e,i,n){return this._optionEx({mandatory:!0},t,e,i,n)}combineFlagAndOptionalValue(t=!0){return this._combineFlagAndOptionalValue=!!t,this}allowUnknownOption(t=!0){return this._allowUnknownOption=!!t,this}allowExcessArguments(t=!0){return this._allowExcessArguments=!!t,this}enablePositionalOptions(t=!0){return this._enablePositionalOptions=!!t,this}passThroughOptions(t=!0){return this._passThroughOptions=!!t,this._checkForBrokenPassThrough(),this}_checkForBrokenPassThrough(){if(this.parent&&this._passThroughOptions&&!this.parent._enablePositionalOptions)throw new Error(`passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`)}storeOptionsAsProperties(t=!0){if(this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");if(Object.keys(this._optionValues).length)throw new Error("call .storeOptionsAsProperties() before setting option values");return this._storeOptionsAsProperties=!!t,this}getOptionValue(t){return this._storeOptionsAsProperties?this[t]:this._optionValues[t]}setOptionValue(t,e){return this.setOptionValueWithSource(t,e,void 0)}setOptionValueWithSource(t,e,i){return this._storeOptionsAsProperties?this[t]=e:this._optionValues[t]=e,this._optionValueSources[t]=i,this}getOptionValueSource(t){return this._optionValueSources[t]}getOptionValueSourceWithGlobals(t){let e;return this._getCommandAndAncestors().forEach((i=>{void 0!==i.getOptionValueSource(t)&&(e=i.getOptionValueSource(t))})),e}_prepareUserArgs(t,e){if(void 0!==t&&!Array.isArray(t))throw new Error("first parameter to parse must be array or undefined");let i;switch(e=e||{},void 0===t&&(t=y.argv,y.versions&&y.versions.electron&&(e.from="electron")),this.rawArgs=t.slice(),e.from){case void 0:case"node":this._scriptPath=t[1],i=t.slice(2);break;case"electron":y.defaultApp?(this._scriptPath=t[1],i=t.slice(2)):i=t.slice(1);break;case"user":i=t.slice(0);break;default:throw new Error(`unexpected parse option { from: '${e.from}' }`)}return!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath),this._name=this._name||"program",i}parse(t,e){const i=this._prepareUserArgs(t,e);return this._parseCommand([],i),this}async parseAsync(t,e){const i=this._prepareUserArgs(t,e);return await this._parseCommand([],i),this}_executeSubCommand(t,e){e=e.slice();let i=!1;const n=[".js",".ts",".tsx",".mjs",".cjs"];function r(t,e){const i=C.resolve(t,e);if(w.existsSync(i))return i;if(n.includes(C.extname(e)))return;const r=n.find((t=>w.existsSync(`${i}${t}`)));return r?`${i}${r}`:void 0}this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let s,o=t._executableFile||`${this._name}-${t._name}`,a=this._executableDir||"";if(this._scriptPath){let t;try{t=w.realpathSync(this._scriptPath)}catch(e){t=this._scriptPath}a=C.resolve(C.dirname(t),a)}if(a){let e=r(a,o);if(!e&&!t._executableFile&&this._scriptPath){const i=C.basename(this._scriptPath,C.extname(this._scriptPath));i!==this._name&&(e=r(a,`${i}-${t._name}`))}o=e||o}if(i=n.includes(C.extname(o)),"win32"!==y.platform?i?(e.unshift(o),e=T(y.execArgv).concat(e),s=A.spawn(y.argv[0],e,{stdio:"inherit"})):s=A.spawn(o,e,{stdio:"inherit"}):(e.unshift(o),e=T(y.execArgv).concat(e),s=A.spawn(y.execPath,e,{stdio:"inherit"})),!s.killed){["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach((t=>{y.on(t,(()=>{!1===s.killed&&null===s.exitCode&&s.kill(t)}))}))}const h=this._exitCallback;s.on("close",((t,e)=>{t=t??1,h?h(new x(t,"commander.executeSubCommandAsync","(close)")):y.exit(t)})),s.on("error",(e=>{if("ENOENT"===e.code){const e=a?`searched for local subcommand relative to directory '${a}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory",i=`'${o}' does not exist\n - if '${t._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name or path\n - ${e}`;throw new Error(i)}if("EACCES"===e.code)throw new Error(`'${o}' not executable`);if(h){const t=new x(1,"commander.executeSubCommandAsync","(error)");t.nestedError=e,h(t)}else y.exit(1)})),this.runningCommand=s}_dispatchSubcommand(t,e,i){const n=this._findCommand(t);let r;return n||this.help({error:!0}),r=this._chainOrCallSubCommandHook(r,n,"preSubcommand"),r=this._chainOrCall(r,(()=>{if(!n._executableHandler)return n._parseCommand(e,i);this._executeSubCommand(n,e.concat(i))})),r}_dispatchHelpCommand(t){t||this.help();const e=this._findCommand(t);return e&&!e._executableHandler&&e.help(),this._dispatchSubcommand(t,[],[this._getHelpOption()?.long??this._getHelpOption()?.short??"--help"])}_checkNumberOfArguments(){this.registeredArguments.forEach(((t,e)=>{t.required&&null==this.args[e]&&this.missingArgument(t.name())})),this.registeredArguments.length>0&&this.registeredArguments[this.registeredArguments.length-1].variadic||this.args.length>this.registeredArguments.length&&this._excessArguments(this.args)}_processArguments(){const t=(t,e,i)=>{let n=e;if(null!==e&&t.parseArg){const r=`error: command-argument value '${e}' is invalid for argument '${t.name()}'.`;n=this._callParseArg(t,e,i,r)}return n};this._checkNumberOfArguments();const e=[];this.registeredArguments.forEach(((i,n)=>{let r=i.defaultValue;i.variadic?n<this.args.length?(r=this.args.slice(n),i.parseArg&&(r=r.reduce(((e,n)=>t(i,n,e)),i.defaultValue))):void 0===r&&(r=[]):n<this.args.length&&(r=this.args[n],i.parseArg&&(r=t(i,r,i.defaultValue))),e[n]=r})),this.processedArgs=e}_chainOrCall(t,e){return t&&t.then&&"function"==typeof t.then?t.then((()=>e())):e()}_chainOrCallHooks(t,e){let i=t;const n=[];return this._getCommandAndAncestors().reverse().filter((t=>void 0!==t._lifeCycleHooks[e])).forEach((t=>{t._lifeCycleHooks[e].forEach((e=>{n.push({hookedCommand:t,callback:e})}))})),"postAction"===e&&n.reverse(),n.forEach((t=>{i=this._chainOrCall(i,(()=>t.callback(t.hookedCommand,this)))})),i}_chainOrCallSubCommandHook(t,e,i){let n=t;return void 0!==this._lifeCycleHooks[i]&&this._lifeCycleHooks[i].forEach((t=>{n=this._chainOrCall(n,(()=>t(this,e)))})),n}_parseCommand(t,e){const i=this.parseOptions(e);if(this._parseOptionsEnv(),this._parseOptionsImplied(),t=t.concat(i.operands),e=i.unknown,this.args=t.concat(e),t&&this._findCommand(t[0]))return this._dispatchSubcommand(t[0],t.slice(1),e);if(this._getHelpCommand()&&t[0]===this._getHelpCommand().name())return this._dispatchHelpCommand(t[1]);if(this._defaultCommandName)return this._outputHelpIfRequested(e),this._dispatchSubcommand(this._defaultCommandName,t,e);!this.commands.length||0!==this.args.length||this._actionHandler||this._defaultCommandName||this.help({error:!0}),this._outputHelpIfRequested(i.unknown),this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();const n=()=>{i.unknown.length>0&&this.unknownOption(i.unknown[0])},r=`command:${this.name()}`;if(this._actionHandler){let i;return n(),this._processArguments(),i=this._chainOrCallHooks(i,"preAction"),i=this._chainOrCall(i,(()=>this._actionHandler(this.processedArgs))),this.parent&&(i=this._chainOrCall(i,(()=>{this.parent.emit(r,t,e)}))),i=this._chainOrCallHooks(i,"postAction"),i}if(this.parent&&this.parent.listenerCount(r))n(),this._processArguments(),this.parent.emit(r,t,e);else if(t.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",t,e);this.listenerCount("command:*")?this.emit("command:*",t,e):this.commands.length?this.unknownCommand():(n(),this._processArguments())}else this.commands.length?(n(),this.help({error:!0})):(n(),this._processArguments())}_findCommand(t){if(t)return this.commands.find((e=>e._name===t||e._aliases.includes(t)))}_findOption(t){return this.options.find((e=>e.is(t)))}_checkForMissingMandatoryOptions(){this._getCommandAndAncestors().forEach((t=>{t.options.forEach((e=>{e.mandatory&&void 0===t.getOptionValue(e.attributeName())&&t.missingMandatoryOptionValue(e)}))}))}_checkForConflictingLocalOptions(){const t=this.options.filter((t=>{const e=t.attributeName();return void 0!==this.getOptionValue(e)&&"default"!==this.getOptionValueSource(e)})),e=t.filter((t=>t.conflictsWith.length>0));e.forEach((e=>{const i=t.find((t=>e.conflictsWith.includes(t.attributeName())));i&&this._conflictingOption(e,i)}))}_checkForConflictingOptions(){this._getCommandAndAncestors().forEach((t=>{t._checkForConflictingLocalOptions()}))}parseOptions(t){const e=[],i=[];let n=e;const r=t.slice();function s(t){return t.length>1&&"-"===t[0]}let o=null;for(;r.length;){const t=r.shift();if("--"===t){n===i&&n.push(t),n.push(...r);break}if(!o||s(t)){if(o=null,s(t)){const e=this._findOption(t);if(e){if(e.required){const t=r.shift();void 0===t&&this.optionMissingArgument(e),this.emit(`option:${e.name()}`,t)}else if(e.optional){let t=null;r.length>0&&!s(r[0])&&(t=r.shift()),this.emit(`option:${e.name()}`,t)}else this.emit(`option:${e.name()}`);o=e.variadic?e:null;continue}}if(t.length>2&&"-"===t[0]&&"-"!==t[1]){const e=this._findOption(`-${t[1]}`);if(e){e.required||e.optional&&this._combineFlagAndOptionalValue?this.emit(`option:${e.name()}`,t.slice(2)):(this.emit(`option:${e.name()}`),r.unshift(`-${t.slice(2)}`));continue}}if(/^--[^=]+=/.test(t)){const e=t.indexOf("="),i=this._findOption(t.slice(0,e));if(i&&(i.required||i.optional)){this.emit(`option:${i.name()}`,t.slice(e+1));continue}}if(s(t)&&(n=i),(this._enablePositionalOptions||this._passThroughOptions)&&0===e.length&&0===i.length){if(this._findCommand(t)){e.push(t),r.length>0&&i.push(...r);break}if(this._getHelpCommand()&&t===this._getHelpCommand().name()){e.push(t),r.length>0&&e.push(...r);break}if(this._defaultCommandName){i.push(t),r.length>0&&i.push(...r);break}}if(this._passThroughOptions){n.push(t),r.length>0&&n.push(...r);break}n.push(t)}else this.emit(`option:${o.name()}`,t)}return{operands:e,unknown:i}}opts(){if(this._storeOptionsAsProperties){const t={},e=this.options.length;for(let i=0;i<e;i++){const e=this.options[i].attributeName();t[e]=e===this._versionOptionName?this._version:this[e]}return t}return this._optionValues}optsWithGlobals(){return this._getCommandAndAncestors().reduce(((t,e)=>Object.assign(t,e.opts())),{})}error(t,e){this._outputConfiguration.outputError(`${t}\n`,this._outputConfiguration.writeErr),"string"==typeof this._showHelpAfterError?this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`):this._showHelpAfterError&&(this._outputConfiguration.writeErr("\n"),this.outputHelp({error:!0}));const i=e||{},n=i.exitCode||1,r=i.code||"commander.error";this._exit(n,r,t)}_parseOptionsEnv(){this.options.forEach((t=>{if(t.envVar&&t.envVar in y.env){const e=t.attributeName();(void 0===this.getOptionValue(e)||["default","config","env"].includes(this.getOptionValueSource(e)))&&(t.required||t.optional?this.emit(`optionEnv:${t.name()}`,y.env[t.envVar]):this.emit(`optionEnv:${t.name()}`))}}))}_parseOptionsImplied(){const t=new V(this.options),e=t=>void 0!==this.getOptionValue(t)&&!["default","implied"].includes(this.getOptionValueSource(t));this.options.filter((i=>void 0!==i.implied&&e(i.attributeName())&&t.valueFromOption(this.getOptionValue(i.attributeName()),i))).forEach((t=>{Object.keys(t.implied).filter((t=>!e(t))).forEach((e=>{this.setOptionValueWithSource(e,t.implied[e],"implied")}))}))}missingArgument(t){const e=`error: missing required argument '${t}'`;this.error(e,{code:"commander.missingArgument"})}optionMissingArgument(t){const e=`error: option '${t.flags}' argument missing`;this.error(e,{code:"commander.optionMissingArgument"})}missingMandatoryOptionValue(t){const e=`error: required option '${t.flags}' not specified`;this.error(e,{code:"commander.missingMandatoryOptionValue"})}_conflictingOption(t,e){const i=t=>{const e=t.attributeName(),i=this.getOptionValue(e),n=this.options.find((t=>t.negate&&e===t.attributeName())),r=this.options.find((t=>!t.negate&&e===t.attributeName()));return n&&(void 0===n.presetArg&&!1===i||void 0!==n.presetArg&&i===n.presetArg)?n:r||t},n=t=>{const e=i(t),n=e.attributeName();return"env"===this.getOptionValueSource(n)?`environment variable '${e.envVar}'`:`option '${e.flags}'`},r=`error: ${n(t)} cannot be used with ${n(e)}`;this.error(r,{code:"commander.conflictingOption"})}unknownOption(t){if(this._allowUnknownOption)return;let e="";if(t.startsWith("--")&&this._showSuggestionAfterError){let i=[],n=this;do{const t=n.createHelp().visibleOptions(n).filter((t=>t.long)).map((t=>t.long));i=i.concat(t),n=n.parent}while(n&&!n._enablePositionalOptions);e=S(t,i)}const i=`error: unknown option '${t}'${e}`;this.error(i,{code:"commander.unknownOption"})}_excessArguments(t){if(this._allowExcessArguments)return;const e=this.registeredArguments.length,i=1===e?"":"s",n=`error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${e} argument${i} but got ${t.length}.`;this.error(n,{code:"commander.excessArguments"})}unknownCommand(){const t=this.args[0];let e="";if(this._showSuggestionAfterError){const i=[];this.createHelp().visibleCommands(this).forEach((t=>{i.push(t.name()),t.alias()&&i.push(t.alias())})),e=S(t,i)}const i=`error: unknown command '${t}'${e}`;this.error(i,{code:"commander.unknownCommand"})}version(t,e,i){if(void 0===t)return this._version;this._version=t,e=e||"-V, --version",i=i||"output the version number";const n=this.createOption(e,i);return this._versionOptionName=n.attributeName(),this._registerOption(n),this.on("option:"+n.name(),(()=>{this._outputConfiguration.writeOut(`${t}\n`),this._exit(0,"commander.version",t)})),this}description(t,e){return void 0===t&&void 0===e?this._description:(this._description=t,e&&(this._argsDescription=e),this)}summary(t){return void 0===t?this._summary:(this._summary=t,this)}alias(t){if(void 0===t)return this._aliases[0];let e=this;if(0!==this.commands.length&&this.commands[this.commands.length-1]._executableHandler&&(e=this.commands[this.commands.length-1]),t===e._name)throw new Error("Command alias can't be the same as its name");const i=this.parent?._findCommand(t);if(i){const e=[i.name()].concat(i.aliases()).join("|");throw new Error(`cannot add alias '${t}' to command '${this.name()}' as already have command '${e}'`)}return e._aliases.push(t),this}aliases(t){return void 0===t?this._aliases:(t.forEach((t=>this.alias(t))),this)}usage(t){if(void 0===t){if(this._usage)return this._usage;const t=this.registeredArguments.map((t=>$(t)));return[].concat(this.options.length||null!==this._helpOption?"[options]":[],this.commands.length?"[command]":[],this.registeredArguments.length?t:[]).join(" ")}return this._usage=t,this}name(t){return void 0===t?this._name:(this._name=t,this)}nameFromFilename(t){return this._name=C.basename(t,C.extname(t)),this}executableDir(t){return void 0===t?this._executableDir:(this._executableDir=t,this)}helpInformation(t){const e=this.createHelp();return void 0===e.helpWidth&&(e.helpWidth=t&&t.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth()),e.formatHelp(this,e)}_getHelpContext(t){const e={error:!!(t=t||{}).error};let i;return i=e.error?t=>this._outputConfiguration.writeErr(t):t=>this._outputConfiguration.writeOut(t),e.write=t.write||i,e.command=this,e}outputHelp(t){let e;"function"==typeof t&&(e=t,t=void 0);const i=this._getHelpContext(t);this._getCommandAndAncestors().reverse().forEach((t=>t.emit("beforeAllHelp",i))),this.emit("beforeHelp",i);let n=this.helpInformation(i);if(e&&(n=e(n),"string"!=typeof n&&!Buffer.isBuffer(n)))throw new Error("outputHelp callback must return a string or a Buffer");i.write(n),this._getHelpOption()?.long&&this.emit(this._getHelpOption().long),this.emit("afterHelp",i),this._getCommandAndAncestors().forEach((t=>t.emit("afterAllHelp",i)))}helpOption(t,e){return"boolean"==typeof t?(this._helpOption=t?this._helpOption??void 0:null,this):(t=t??"-h, --help",e=e??"display help for command",this._helpOption=this.createOption(t,e),this)}_getHelpOption(){return void 0===this._helpOption&&this.helpOption(void 0,void 0),this._helpOption}addHelpOption(t){return this._helpOption=t,this}help(t){this.outputHelp(t);let e=y.exitCode||0;0===e&&t&&"function"!=typeof t&&t.error&&(e=1),this._exit(e,"commander.help","(outputHelp)")}addHelpText(t,e){const i=["beforeAll","before","after","afterAll"];if(!i.includes(t))throw new Error(`Unexpected value for position to addHelpText.\nExpecting one of '${i.join("', '")}'`);const n=`${t}Help`;return this.on(n,(t=>{let i;i="function"==typeof e?e({error:t.error,command:t.command}):e,i&&t.write(`${i}\n`)})),this}_outputHelpIfRequested(t){const e=this._getHelpOption();e&&t.find((t=>e.is(t)))&&(this.outputHelp(),this._exit(0,"commander.helpDisplayed","(outputHelp)"))}};const{Argument:P}=l,{Command:N}=m,{CommanderError:F,InvalidArgumentError:D}=c,{Help:j}=d,{Option:I}=f;h.program=new N,h.createCommand=t=>new N(t),h.createOption=(t,e)=>new I(t,e),h.createArgument=(t,e)=>new P(t,e),h.Command=N,h.Option=I,h.Argument=P,h.Help=j,h.CommanderError=F,h.InvalidArgumentError=D,h.InvalidOptionArgumentError=D;const{program:M,createCommand:W,createArgument:q,createOption:G,CommanderError:U,InvalidArgumentError:R,InvalidOptionArgumentError:L,Command:B,Argument:J,Option:Y,Help:z}=h;var K="./node_modules/".concat("churro-test","/dist/index.d.ts");M.name("next-server-theme").description("Cli to modify theme types").version("3.0.0"),M.command("types").description("Displayes current theme type").action((function(){return o(void 0,void 0,void 0,(function(){var t,e,i;return a(this,(function(n){switch(n.label){case 0:return[4,s.readFile(K,{encoding:"utf8"})];case 1:return t=n.sent(),e=null===(i=t.split("type Theme = ")[1])||void 0===i?void 0:i.split(";")[0],console.log(e),[2]}}))}))})),M.command("change").description("Modify theme type").argument("<strings...>","modified theme types").action((function(t){return o(void 0,void 0,void 0,(function(){var e,i,n,r;return a(this,(function(o){switch(o.label){case 0:return console.log(t),[4,s.readFile(K,{encoding:"utf8"})];case 1:return e=o.sent(),"type Theme = undefined;"===(i=null===(r=e.split("type Theme = ")[1])||void 0===r?void 0:r.split(";")[0])?(console.log("No theme type found"),[2]):(n=e.replace("type Theme = ".concat(i,";"),"type Theme = ".concat(t.map((function(t){return'"'.concat(t.trim(),'"')})).join(" | "),";")),[4,s.writeFile(K,n,"utf8")]);case 2:return o.sent(),console.log("Theme type changed"),[2]}}))}))})),M.parse();