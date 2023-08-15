import{_ as n,o as s,c as a,a as e}from"./app-a6a5d4a7.js";const o={},p=e(`<p>Protocol Buffer (简称Protobuf) 是Google出品的性能优异、跨语言、跨平台的序列化库。</p><blockquote><p>序列化(serialization、marshalling)的过程是指将数据结构或者对象的状态转换成可以存储(比如文件、内存)或者传输的格式(比如网络)。反向操作就是反序列化(deserialization、unmarshalling)的过程。</p></blockquote><p>Protobuf支持很多语言，比如C++、C#、Dart、Go、Java、Python、Rust等，同时也是跨平台的，所以得到了广泛的应用。</p><p>Protobuf包含序列化格式的定义、各种语言的库以及一个IDL编译器。正常情况下你需要定义proto文件，然后使用IDL编译器编译成你需要的语言。</p><h3 id="_1-历史" tabindex="-1"><a class="header-anchor" href="#_1-历史" aria-hidden="true">#</a> 1. 历史</h3><p>2001年初，Protobuf首先在Google内部创建， 我们把它称之为 <code>proto1</code></p><p>2008年7月7日，Protobuf开始公布出来，称为 <code>proto2</code></p><blockquote><p>Protobuf公布出来也得到了大家的广泛的关注， 逐步地也得到了大家的认可，很多项目也采用Protobuf进行消息的通讯，还有基于Protobuf的微服务框架GRPC。在使用的过程中，大家也提出了很多的意见和建议，Protobuf也在演化</p></blockquote><p>2016年推出了Proto3，Proto3简化了proto2的开发，提高了开发的效能，但是也带来了版本不兼容的问题。</p><p>官方建议新项目采用proto3，老项目因为兼容性的问题继续使用proto2,并且会长时间的支持proto2。</p><h3 id="_2-proto3的改变" tabindex="-1"><a class="header-anchor" href="#_2-proto3的改变" aria-hidden="true">#</a> 2. Proto3的改变</h3><ul><li>移除了原始值字段的出现逻辑。</li><li>移除了<code>required</code>字段</li><li>移除了缺省值</li><li>移除了<code>unknown</code>字段 （3.5中又加上了）</li><li>移除了扩展，使用<code>Any</code>代替</li><li>修复了未知的枚举值的语义</li><li>添加了map类型</li><li>添加了一些标准类似，比如time、动态数据的呈现</li><li>可以使用JSON编码代替二进制proto编码</li></ul><h3 id="_3-一个简单的例子" tabindex="-1"><a class="header-anchor" href="#_3-一个简单的例子" aria-hidden="true">#</a> 3. 一个简单的例子</h3><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">message</span> <span class="token class-name">ListArticlesRequest</span> <span class="token punctuation">{</span>
	<span class="token builtin">int64</span> page <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>			<span class="token comment">// 页码</span>
	<span class="token builtin">int64</span> page_size <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>	<span class="token comment">// 分页大小</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">ListArticlesResponse</span> <span class="token punctuation">{</span>
	<span class="token keyword">repeated</span> <span class="token positional-class-name class-name">Article</span> articles <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>	<span class="token comment">// 文章列表</span>
	<span class="token builtin">int64</span> total_size <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>	<span class="token comment">// 所有文章总数</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>
	<span class="token builtin">int64</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token builtin">string</span> title <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token builtin">string</span> content <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第一行指定protobuf的版本，这里是以<code>proto3</code>格式定义</li><li>message类型会被protoc编译成不同的编程语言的相应对象，比如Java中的class、Go中的struct等</li><li>字段格式：<code>[repeated] type fieldName = fieldNumber [[ fieldOptions ]];</code></li><li>编译生成代码：在当前的目录下执行<code>protoc -I=. -I /usr/local/include -I=$(GOPATH)/src --go_out=. simple.proto</code>, 可以将这个proto编译成Go的代码，因为这里我们使用了<code>go_out</code>输出格式 <ul><li><code>-I</code> 指定protoc的搜索import的proto的文件夹。在<code>MacOS</code>操作系统中protobuf把一些扩展的proto放在了<code>/usr/local/include</code>对应的文件夹中，一些第三方的Go库放在了gopath对应的包下，所以这里都把它们加上了。对于这个简单的例子，实际是不需要的。</li><li><code>go_out</code>用来生成Go代码，<code>cpp_out</code>用来生成C++代码，<code>java_out</code>产生Java代码，<code>python_out</code>产生python代码，类似地还有<code>csharp_out</code>、<code>objc_out</code>、<code>ruby_out</code>、<code>php_out</code>等参数</li><li><code>--go_out=.</code> 指定代码生成后存放的路径</li></ul></li></ul><h3 id="_4-引入其他proto文件" tabindex="-1"><a class="header-anchor" href="#_4-引入其他proto文件" aria-hidden="true">#</a> 4. 引入其他proto文件</h3><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">import</span> <span class="token string">&quot;other.proto&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">public</span> <span class="token string">&quot;other2.proto&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> weak <span class="token string">&quot;other.proto&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较少使用的是<code>public</code>和<code>weak</code>关键字。默认情况下<code>weak</code>引入的文件允许不存在(missing)，只为了google内部使用。<code>public</code>具有传递性，如果你在文件中通过<code>public</code>引入第三方的proto文件，那么引入你这个文件同时也会引入第三方的proto。</p><p>我们一般忽略<code>public</code>和<code>weak</code>关键字，这两个关键字也没有在规范中详细进行介绍。</p><h3 id="_5-package" tabindex="-1"><a class="header-anchor" href="#_5-package" aria-hidden="true">#</a> 5. package</h3><p>定义proto的包名，包名可以避免对message 类型之间的名字冲突，同名的Message可以通过package进行区分。</p><p>在没有为特定语言定义 <code>option xxx_package</code> 的时候，它还可以用来生成特定语言的包名，比如Java package, go package。</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">package</span> foo<span class="token punctuation">.</span>bar<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-option" tabindex="-1"><a class="header-anchor" href="#_6-option" aria-hidden="true">#</a> 6. option</h3><p>option可以用在proto的scope中，或者message、enum、service的定义中。 可以是Protobuf定义的option，或者自定义的option。</p><p>option的定义格式是<code>&quot;option&quot; optionName &quot;=&quot; constant &quot;;&quot;</code></p><p>比如设置各种语言的包名：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">option</span> go_package <span class="token operator">=</span> <span class="token string">&quot;learnkratos/api/helloworld/v1;v1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">option</span> java_multiple_files <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">option</span> java_package <span class="token operator">=</span> <span class="token string">&quot;helloworld.v1.errors&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">option</span> objc_class_prefix <span class="token operator">=</span> <span class="token string">&quot;APIHelloworldErrors&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些Protobuf定义的option:</p><ul><li>java_package</li><li>java_multiple_files</li><li>java_outer_classname</li><li>optimize_for</li><li>cc_enable_arenas</li><li>objc_class_prefix</li><li>deprecated</li></ul><h3 id="_7-字段" tabindex="-1"><a class="header-anchor" href="#_7-字段" aria-hidden="true">#</a> 7. 字段</h3><p>前面讲过，字段格式：<code>[repeated] type fieldName = fieldNumber [[ fieldOptions ]];</code></p><p><code>repeated</code>允许字段重复，对于Go语言来说，它会编译成数组类型</p><p>其中类型可以是以下几种类型：</p><ul><li>数字类型： double、float、int32、int64、uint32、uint64、sint32、sint64: 存储长度可变的浮点数、整数、无符号整数和有符号整数</li><li>存储固定大小的数字类型：fixed32、fixed64、sfixed32、sfixed64: 存储空间固定</li><li>布尔类型: bool</li><li>字符串: string</li><li>bytes: 字节数组</li><li>messageType: 消息类型</li><li>enumType:枚举类型</li></ul><p>字段名、消息名、枚举类型名、map名、服务名等名称首字母必须是字母类型，然后可以是字母、数字或者下划线_</p><p>proto类型和各语言的对应关系可以参考文档：<a href="https://developers.google.com/protocol-buffers/docs/proto3#scalar" target="_blank" rel="noopener noreferrer">Scalar Value Types</a></p><p>同一个message的每个字段都有唯一一个编号，并且建议终生这个编号都不要改变。</p><h4 id="_7-1-oneof" tabindex="-1"><a class="header-anchor" href="#_7-1-oneof" aria-hidden="true">#</a> 7.1 oneof</h4><p>如果你有一组字段，同时最多允许这一组中的一个字段出现，就可以使用<code>Oneof</code>定义这一组字段</p><p>比如请求用户队列，有个判断用户身份类型的字段，只能选择特定值中的一个</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">package</span> abc<span class="token punctuation">;</span>
<span class="token keyword">message</span> <span class="token class-name">ListArticlesRequest</span> <span class="token punctuation">{</span>
    <span class="token keyword">oneof</span> user_status <span class="token punctuation">{</span>
      <span class="token builtin">int64</span> normal <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token builtin">int64</span> admin <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-2-map" tabindex="-1"><a class="header-anchor" href="#_7-2-map" aria-hidden="true">#</a> 7.2 map</h4><p>map类型需要设置键和值的类型，格式是 <code>map&lt;keyType,valueType&gt; mapName = fieldNumber [filedOptions]</code></p><p>比如：<code>map&lt;int64,string&gt; values = 1;</code></p><p><strong>map<code>字段不能同时使用</code>repeated</strong></p><h4 id="_7-3-reserved" tabindex="-1"><a class="header-anchor" href="#_7-3-reserved" aria-hidden="true">#</a> 7.3 Reserved</h4><p>Reserved可以用来指明此message占位但不使用某些字段，也就是忽略这些字段，可以通过字段编号范围或者字段名称指定保留的字段</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">package</span> abc<span class="token punctuation">;</span>
<span class="token keyword">message</span> <span class="token class-name">AllNormalypes</span> <span class="token punctuation">{</span>
  <span class="token keyword">reserved</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token keyword">to</span> <span class="token number">6</span><span class="token punctuation">;</span>
  <span class="token keyword">reserved</span> <span class="token string">&quot;field14&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;field11&quot;</span><span class="token punctuation">;</span>
  <span class="token builtin">double</span> field1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// float field2 = 2;</span>
  <span class="token builtin">int32</span> field3 <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// int64 field4 = 4;</span>
  <span class="token comment">// uint32 field5 = 5;</span>
  <span class="token comment">// uint64 field6 = 6;</span>
  <span class="token builtin">sint32</span> field7 <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
  <span class="token builtin">sint64</span> field8 <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
  <span class="token builtin">fixed32</span> field9 <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span>
  <span class="token builtin">fixed64</span> field10 <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  <span class="token comment">// sfixed32 field11 = 11;</span>
  <span class="token builtin">sfixed64</span> field12 <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
  <span class="token builtin">bool</span> field13 <span class="token operator">=</span> <span class="token number">13</span><span class="token punctuation">;</span>
  <span class="token comment">// string field14 = 14;</span>
  <span class="token builtin">bytes</span> field15 <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-4-枚举类型" tabindex="-1"><a class="header-anchor" href="#_7-4-枚举类型" aria-hidden="true">#</a> 7.4 枚举类型</h4><p>限定字段的值只能取某个特定的值，比如星期类型只能取周一到周日七个值</p><p>注意枚举类型的定义采用C++ scoping规则，也就是枚举值是枚举类型的兄弟类型，而不是子类型，所以避免在同一个package定义重名的枚举字段。</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">enum</span> <span class="token class-name">EnumAllowingAlias</span> <span class="token punctuation">{</span>
  <span class="token keyword">option</span> allow_alias <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  UNKNOWN <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  STARTED <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  RUNNING <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">enum</span> <span class="token class-name">EnumNotAllowingAlias</span> <span class="token punctuation">{</span>
  UNKNOWN2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  STARTED2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// RUNNING = 1; </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>虽然产生的Go代码会给产生的类型加上前缀，但是proto的定义还是需要避免重名(把上面的STARTED2改成STARTED试试)。</strong></p><p>如果设置<code>allow_alias</code>，允许字段编号重复，<code>RUNNING</code>是<code>STARTED</code>的别名。</p><h4 id="_7-5-其他类型" tabindex="-1"><a class="header-anchor" href="#_7-5-其他类型" aria-hidden="true">#</a> 7.5 其他类型</h4><p>可以使用其它message类型作为字段的类型值。因为前面在介绍字段的类型的时候说了，类型可以是消息类型和枚举类型，枚举类型如上所示，而消息类型如下所示：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">message</span> <span class="token class-name">SearchResponse</span> <span class="token punctuation">{</span>
  <span class="token keyword">repeated</span> <span class="token positional-class-name class-name">Result</span> results <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> url <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> title <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">repeated</span> <span class="token builtin">string</span> snippets <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要使用的类型在其它proto文件中定义，你需要使用<code>import</code>把对应的文件引入进来。</p><h4 id="_7-6-嵌套类型" tabindex="-1"><a class="header-anchor" href="#_7-6-嵌套类型" aria-hidden="true">#</a> 7.6 嵌套类型</h4><p>嵌套类型就是消息类型里面定义了消息类型:</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">message</span> <span class="token class-name">SearchResponse</span> <span class="token punctuation">{</span>
  <span class="token keyword">message</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
    <span class="token builtin">string</span> url <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token builtin">string</span> title <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">repeated</span> <span class="token builtin">string</span> snippets <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">repeated</span> <span class="token positional-class-name class-name">Result</span> results <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-7-any" tabindex="-1"><a class="header-anchor" href="#_7-7-any" aria-hidden="true">#</a> 7.7 Any</h4><p><code>Any</code>字段允许你处理嵌套数据，并不需要它的proto定义。一个<code>Any</code>以bytes呈现序列化的消息，并且包含一个URL作为这个类型的唯一标识和元数据。</p><p>为了使用<code>Any</code>类型，需要引入<code>google/protobuf/any.proto</code></p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">import</span> <span class="token string">&quot;google/protobuf/any.proto&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">message</span> <span class="token class-name">ErrorStatus</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> message <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">repeated</span> <span class="token positional-class-name class-name">google<span class="token punctuation">.</span>protobuf<span class="token punctuation">.</span>Any</span> details <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-更新消息类型" tabindex="-1"><a class="header-anchor" href="#_8-更新消息类型" aria-hidden="true">#</a> 8. 更新消息类型</h3><p>有时候不得不修改正在使用的proto文件，比如为类型增加一个字段，protobuf支持这种修改而不影响已有的服务，不过你需要遵循一定的规则：</p><ul><li>不要改变已有字段的字段编号</li><li>当你增加一个新的字段的时候，老系统序列化后的数据依然可以被你的新的格式所解析，只不过你需要处理新加字段的缺省值。 老系统也能解析你信息的值，新加字段只不过被丢弃了</li><li>字段也可以被移除，但是建议你Reserved这个字段，避免将来会使用这个字段</li><li>int32, uint32, int64, uint64 和 bool类型都是兼容的</li><li>sint32 和 sint64兼容，但是不和其它整数类型兼容</li><li>string 和 bytes兼容，如果 bytes 是合法的UTF-8 bytes的话</li><li>嵌入类型和bytes兼容，如果bytes包含一个消息的编码版本的话</li><li>fixed32和sfixed32, fixed64和sfixed64</li><li>enum和int32, uint32, int64, uint64格式兼容</li><li>把单一一个值改变成一个新的oneof类型的一个成员是安全和二进制兼容的。把一组字段变成一个新的oneof字段也是安全的，如果你确保这一组字段最多只会设置一个。把一个字段移动到一个已存在的oneof字段是不安全的</li></ul>`,69),t=[p];function i(l,c){return s(),a("div",null,t)}const d=n(o,[["render",i],["__file","index.html.vue"]]);export{d as default};
