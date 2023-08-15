import{_ as n,o as s,c as a,a as t}from"./app-c399b13a.js";const e={},i=t(`<p>日常Go编程时，经常会去实现一些带有设置选项的创建型函数，比如创建一个网络通信的客户端，创建客户端实例的函数需要提供某种方式可以让调用者设置客户端的一些行为属性，比如：超时时间、重试次数等等。但有时候提供的可设置选项比较多时，甚至后续还会增加。因此，设计和实现这样的创建型函数时要尤为考虑使用者的体验：不能因选项较多而提供过多参数或者多个API，并且要保证选项持续增加后，已经对外的接口依旧保持稳定。</p><p>我们来设计和实现一个精装房实例，生活中精装房是有很多不同装修选项的，比如：</p><ul><li>装修风格：美式/中式/欧式</li><li>是否安装中央空调系统</li><li>地面材料：瓷砖/实木地板</li><li>墙面材料：乳胶漆/壁纸/硅藻泥</li><li>……</li></ul><h3 id="版本1-通过参数暴露配置选项" tabindex="-1"><a class="header-anchor" href="#版本1-通过参数暴露配置选项" aria-hidden="true">#</a> 版本1：通过参数暴露配置选项</h3><p>一个最简单直接的实现方法就是通过函数参数暴露配置选项</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> FinishedHouse <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Style                  <span class="token builtin">int</span>    <span class="token comment">// 0: Chinese, 1: American, 2: European</span>
	CentralAirConditioning <span class="token builtin">bool</span>   <span class="token comment">// true or false</span>
	FloorMaterial          <span class="token builtin">string</span> <span class="token comment">// &quot;ground-tile&quot; or ”wood&quot;</span>
	WallMaterial           <span class="token builtin">string</span> <span class="token comment">// &quot;latex&quot; or &quot;paper&quot; or &quot;diatom-mud&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewFinishedHouse</span><span class="token punctuation">(</span>style <span class="token builtin">int</span><span class="token punctuation">,</span> centralAirConditioning <span class="token builtin">bool</span><span class="token punctuation">,</span>
	floorMaterial<span class="token punctuation">,</span> wallMaterial <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>FinishedHouse <span class="token punctuation">{</span>

	<span class="token comment">// here: you should do some check to the arguments passed</span>

	h <span class="token operator">:=</span> <span class="token operator">&amp;</span>FinishedHouse<span class="token punctuation">{</span>
		Style<span class="token punctuation">:</span>                  style<span class="token punctuation">,</span>
		CentralAirConditioning<span class="token punctuation">:</span> centralAirConditioning<span class="token punctuation">,</span>
		FloorMaterial<span class="token punctuation">:</span>          floorMaterial<span class="token punctuation">,</span>
		WallMaterial<span class="token punctuation">:</span>           wallMaterial<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> h
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点： <ul><li>快速实现</li><li>调用者直接调用，成本低</li></ul></li><li>缺点： <ul><li>接口没法扩展</li><li>参数过多时调用者很难操作</li></ul></li></ul><h3 id="版本2-使用结构体封装配置选项" tabindex="-1"><a class="header-anchor" href="#版本2-使用结构体封装配置选项" aria-hidden="true">#</a> 版本2：使用结构体封装配置选项</h3><p>软件设计中的一个比较重要的原则就是“封装变化”，既然我们无法控制将来要加入的配置选项的个数和内容，但还要尽可能保持提供单一接口，我们就把“配置选项”这个变量抽取出来封装到一个结构体中，这也是目前比较常见的作法。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> FinishedHouse <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	style                  <span class="token builtin">int</span>    <span class="token comment">// 0: Chinese, 1: American, 2: European</span>
	centralAirConditioning <span class="token builtin">bool</span>   <span class="token comment">// true or false</span>
	floorMaterial          <span class="token builtin">string</span> <span class="token comment">// &quot;ground-tile&quot; or ”wood&quot;</span>
	wallMaterial           <span class="token builtin">string</span> <span class="token comment">// &quot;latex&quot; or &quot;paper&quot; or &quot;diatom-mud&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Options <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Style                  <span class="token builtin">int</span>    <span class="token comment">// 0: Chinese, 1: American, 2: European</span>
	CentralAirConditioning <span class="token builtin">bool</span>   <span class="token comment">// true or false</span>
	FloorMaterial          <span class="token builtin">string</span> <span class="token comment">// &quot;ground-tile&quot; or ”wood&quot;</span>
	WallMaterial           <span class="token builtin">string</span> <span class="token comment">// &quot;latex&quot; or &quot;paper&quot; or &quot;diatom-mud&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewFinishedHouse</span><span class="token punctuation">(</span>options <span class="token operator">*</span>Options<span class="token punctuation">)</span> <span class="token operator">*</span>FinishedHouse <span class="token punctuation">{</span>
	<span class="token comment">// use default style and materials if option is nil</span>
	<span class="token keyword">var</span> style <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">var</span> centralAirConditioning <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token keyword">var</span> floorMaterial <span class="token operator">=</span> <span class="token string">&quot;wood&quot;</span>
	<span class="token keyword">var</span> wallMaterial <span class="token operator">=</span> <span class="token string">&quot;paper&quot;</span>

	<span class="token keyword">if</span> options <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// here: you should do some check to the options passed</span>

		style <span class="token operator">=</span> options<span class="token punctuation">.</span>Style
		centralAirConditioning <span class="token operator">=</span> options<span class="token punctuation">.</span>CentralAirConditioning
		floorMaterial <span class="token operator">=</span> options<span class="token punctuation">.</span>FloorMaterial
		wallMaterial <span class="token operator">=</span> options<span class="token punctuation">.</span>WallMaterial
	<span class="token punctuation">}</span>

	h <span class="token operator">:=</span> <span class="token operator">&amp;</span>FinishedHouse<span class="token punctuation">{</span>
		style<span class="token punctuation">:</span>                  style<span class="token punctuation">,</span>
		centralAirConditioning<span class="token punctuation">:</span> centralAirConditioning<span class="token punctuation">,</span>
		floorMaterial<span class="token punctuation">:</span>          floorMaterial<span class="token punctuation">,</span>
		wallMaterial<span class="token punctuation">:</span>           wallMaterial<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> h
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点 <ul><li>后续添加新配置选项，Options 结构体可以随着时间变迁而增长，但 FinishedHouse 创建函数本身的 API 签名是保持不变的；</li><li>调用者可以使用 nil 来表示他们希望使用默认配置选项；</li><li>这种方法还带来了额外收获：更好的文档记录（文档重点从对 NewFinishedHouse 函数的大段注释描述转移到了对 Options 结构体各字段的说明）</li></ul></li><li>缺点 <ul><li>调用者可能会有如此疑问：传递 nil 和传递&amp;Options{}之间有区别吗；</li><li>每次传递 Options 都要将 Options 中的所有字段做正确显式的赋值，即便调用者想使用某个配置项的默认值，赋值动作 1 依然不可少；</li><li>调用者还可能有如此疑问：如果传递给 NewFinishedHourse 的 options 中的字段值在函数调用后发生了变化会发生什么情况？</li></ul></li></ul><h3 id="版本3-使用-功能选项-模式" tabindex="-1"><a class="header-anchor" href="#版本3-使用-功能选项-模式" aria-hidden="true">#</a> 版本3：使用“功能选项”模式</h3><p>Go 语言之父 Rob Pike 早在 2014 年就在其一篇博文<a href="https://commandcenter.blogspot.com/2014/01/self-referential-functions-and-design.html" target="_blank" rel="noopener noreferrer">“自引用函数与选项设计”</a>中论述了一种被后人称为“功能选项(functional option)”的模式，这种模式应该是目前进行功能选项设计的最佳实践方案。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> FinishedHouse <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	style                  <span class="token builtin">int</span>    <span class="token comment">// 0: Chinese, 1: American, 2: European</span>
	centralAirConditioning <span class="token builtin">bool</span>   <span class="token comment">// true or false</span>
	floorMaterial          <span class="token builtin">string</span> <span class="token comment">// &quot;ground-tile&quot; or ”wood&quot;</span>
	wallMaterial           <span class="token builtin">string</span> <span class="token comment">// &quot;latex&quot; or &quot;paper&quot; or &quot;diatom-mud&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Option <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>FinishedHouse<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">NewFinishedHouse</span><span class="token punctuation">(</span>options <span class="token operator">...</span>Option<span class="token punctuation">)</span> <span class="token operator">*</span>FinishedHouse <span class="token punctuation">{</span>
	h <span class="token operator">:=</span> <span class="token operator">&amp;</span>FinishedHouse<span class="token punctuation">{</span>
		style<span class="token punctuation">:</span>                  <span class="token number">0</span><span class="token punctuation">,</span>
		centralAirConditioning<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		floorMaterial<span class="token punctuation">:</span>          <span class="token string">&quot;wood&quot;</span><span class="token punctuation">,</span>
		wallMaterial<span class="token punctuation">:</span>           <span class="token string">&quot;paper&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> option <span class="token operator">:=</span> <span class="token keyword">range</span> options <span class="token punctuation">{</span>
		<span class="token function">option</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> h
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithStyle</span><span class="token punctuation">(</span>style <span class="token builtin">int</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>h <span class="token operator">*</span>FinishedHouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		h<span class="token punctuation">.</span>style <span class="token operator">=</span> style
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithFloorMaterial</span><span class="token punctuation">(</span>material <span class="token builtin">string</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>h <span class="token operator">*</span>FinishedHouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		h<span class="token punctuation">.</span>floorMaterial <span class="token operator">=</span> material
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithWallMaterial</span><span class="token punctuation">(</span>material <span class="token builtin">string</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>h <span class="token operator">*</span>FinishedHouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		h<span class="token punctuation">.</span>wallMaterial <span class="token operator">=</span> material
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithCentralAirConditioning</span><span class="token punctuation">(</span>centralAirConditioning <span class="token builtin">bool</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>h <span class="token operator">*</span>FinishedHouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		h<span class="token punctuation">.</span>centralAirConditioning <span class="token operator">=</span> centralAirConditioning
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">NewFinishedHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// use default options</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">NewFinishedHouse</span><span class="token punctuation">(</span>
		<span class="token function">WithStyle</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">WithFloorMaterial</span><span class="token punctuation">(</span><span class="token string">&quot;ground-tile&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">WithCentralAirConditioning</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该方案中，通过定义函数作为配置选项，用户通过自己需求传入函数选项即可实现配置自定义</p><ul><li>优点： <ul><li>更漂亮的、不随时间变化的公共 API</li><li>参数可读性更好</li><li>配置选项高度可扩展</li><li>提供使用默认选项的最简单方式</li><li>使用更安全（不会像版本 2 那样在创建函数被调用后，调用者仍然可以修改 options）</li></ul></li></ul>`,16),o=[i];function l(p,c){return s(),a("div",null,o)}const r=n(e,[["render",l],["__file","index.html.vue"]]);export{r as default};
