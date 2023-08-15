import{_ as n,o as s,c as a,a as t}from"./app-c399b13a.js";const p={},e=t(`<p>学习数据结构先思考：</p><ul><li>栈的结构是什么样的？如何存储数据？</li><li>有哪些应用场景</li><li>如何使用计算机语言实现</li></ul><h3 id="_1-结构" tabindex="-1"><a class="header-anchor" href="#_1-结构" aria-hidden="true">#</a> 1. 结构</h3><p>​ 关于“栈”，有一个非常贴切的例子，就是一摞叠在一起的盘子。我们平时放盘子的时候，都是从下往上一个一个放；取的时候，我们也是从上往下一个一个地依次取，不能从中间任意抽出。</p><p>栈的实现由两种：</p><ul><li>使用数组 —— 顺序栈，数组大小固定，当需要扩容的时候涉及数据迁移</li><li>使用链表 —— 链式栈，每次插入一个元素就需要创建结点</li></ul><p>栈涉及在一端插入和删除数据，并且满足后进先出、先进后出的特性，栈是一种“操作受限”的线性表</p><p>如果栈的容量受限，那么可以优先考虑顺序栈</p><p>如果栈的容量需要不断变化，优先考虑链式栈</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/* 顺序栈 */</span>
<span class="token keyword">type</span> ArrStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	<span class="token comment">//cap int	// 容量</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 链式栈 */</span>
<span class="token keyword">type</span> LinkStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	top <span class="token operator">*</span>StackNode
	<span class="token builtin">len</span> <span class="token builtin">int</span>
	<span class="token comment">//cap int	// 容量</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> StackNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	value <span class="token builtin">int</span>
	next <span class="token operator">*</span>StackNode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-应用场景" tabindex="-1"><a class="header-anchor" href="#_2-应用场景" aria-hidden="true">#</a> 2. 应用场景</h3><p>优点：只剩下必要方法 Push Pop Top</p><p>应用场景：</p><ul><li><p>浏览器的回退前进(需要Pop不丢弃数据而只是移动Top指针)</p></li><li><p>表达式求值</p><p><img src="https://static.mittacy.com/blog/20200327222431.jpg" alt=""></p></li><li><p>括号匹配，和表达式求值类似</p></li></ul><h3 id="_3-必备方法" tabindex="-1"><a class="header-anchor" href="#_3-必备方法" aria-hidden="true">#</a> 3. 必备方法</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Stack <span class="token punctuation">{</span><span class="token punctuation">}</span>	<span class="token comment">// NewStack 创建栈</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Stack<span class="token punctuation">)</span> <span class="token function">Push</span><span class="token punctuation">(</span>data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>	<span class="token comment">// Push 进栈，向栈的顶部添加结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Stack<span class="token punctuation">)</span> <span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>StackNode <span class="token punctuation">{</span><span class="token punctuation">}</span>	<span class="token comment">// Pop 出栈</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Stack<span class="token punctuation">)</span> <span class="token function">Top</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>StackNode <span class="token punctuation">{</span><span class="token punctuation">}</span>	<span class="token comment">// Top 返回栈的顶部结点，没有返回nil</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-go实现顺序栈" tabindex="-1"><a class="header-anchor" href="#_4-go实现顺序栈" aria-hidden="true">#</a> 4. Go实现顺序栈</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/*
 顺序栈
 */</span>
<span class="token keyword">type</span> ArrStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	<span class="token comment">//cap int	// 容量</span>
<span class="token punctuation">}</span>
<span class="token comment">// NewArrStack 创建栈</span>
<span class="token keyword">func</span> <span class="token function">NewArrStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> ArrStack <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> ArrStack<span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>
<span class="token comment">// Push 进栈，向栈的顶部添加结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>ArrStack<span class="token punctuation">)</span> <span class="token function">Push</span><span class="token punctuation">(</span>value <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	stack<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>data<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// Top 返回栈的顶部，没有返回 err</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>ArrStack<span class="token punctuation">)</span> <span class="token function">Top</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	length <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
	<span class="token keyword">if</span> length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;the Stack is empty&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> stack<span class="token punctuation">.</span>data<span class="token punctuation">[</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">// Pop 出栈</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>ArrStack<span class="token punctuation">)</span> <span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	length <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
	<span class="token keyword">if</span> length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;the Stack is empty&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	temp <span class="token operator">:=</span> stack<span class="token punctuation">.</span>data<span class="token punctuation">[</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
	stack<span class="token punctuation">.</span>data <span class="token operator">=</span> stack<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token punctuation">:</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token keyword">return</span> temp<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">// Len 栈的长度</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>ArrStack<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// IsEmpty 栈是否为空</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>ArrStack<span class="token punctuation">)</span> <span class="token function">IsEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-go实现链式栈" tabindex="-1"><a class="header-anchor" href="#_5-go实现链式栈" aria-hidden="true">#</a> 5. Go实现链式栈</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/*
 链式栈
 */</span>
<span class="token keyword">type</span> LinkStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	top <span class="token operator">*</span>StackNode
	<span class="token builtin">len</span> <span class="token builtin">int</span>
	<span class="token comment">//cap int	// 容量</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> StackNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	value <span class="token builtin">int</span>
	next <span class="token operator">*</span>StackNode
<span class="token punctuation">}</span>
<span class="token comment">// NewLinkStack 创建栈</span>
<span class="token keyword">func</span> <span class="token function">NewLinkStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> LinkStack <span class="token punctuation">{</span>
	<span class="token keyword">return</span> LinkStack<span class="token punctuation">{</span><span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// Push 进栈，向栈的顶部添加结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span> <span class="token function">Push</span><span class="token punctuation">(</span>value <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	node <span class="token operator">:=</span> StackNode<span class="token punctuation">{</span>value<span class="token punctuation">,</span> stack<span class="token punctuation">.</span>top<span class="token punctuation">}</span>
	stack<span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token operator">&amp;</span>node
	stack<span class="token punctuation">.</span><span class="token builtin">len</span><span class="token operator">++</span>
<span class="token punctuation">}</span>
<span class="token comment">// Top 返回栈的顶部，没有返回 err</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span> <span class="token function">Top</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> stack<span class="token punctuation">.</span><span class="token builtin">len</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;the Stack is empty&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> stack<span class="token punctuation">.</span>top<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">// Pop 出栈</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span> <span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> stack<span class="token punctuation">.</span><span class="token builtin">len</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;the Stack is empty&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	temp <span class="token operator">:=</span> stack<span class="token punctuation">.</span>top<span class="token punctuation">.</span>value
	stack<span class="token punctuation">.</span>top <span class="token operator">=</span> stack<span class="token punctuation">.</span>top<span class="token punctuation">.</span>next
	stack<span class="token punctuation">.</span><span class="token builtin">len</span><span class="token operator">--</span>
	<span class="token keyword">return</span> temp<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">// Len 栈的长度</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> stack<span class="token punctuation">.</span><span class="token builtin">len</span>
<span class="token punctuation">}</span>
<span class="token comment">// IsEmpty 栈是否为空</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>stack <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span> <span class="token function">IsEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> stack<span class="token punctuation">.</span><span class="token builtin">len</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","index.html.vue"]]);export{k as default};
