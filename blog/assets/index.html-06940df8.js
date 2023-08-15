import{_ as n,o as s,c as a,a as t}from"./app-c399b13a.js";const e={},p=t(`<h3 id="_1-结构" tabindex="-1"><a class="header-anchor" href="#_1-结构" aria-hidden="true">#</a> 1. 结构</h3><p><img src="https://static.mittacy.com/blog/20200403134554.jpg" alt=""></p><p>二叉查找树要求，在树中的任意一个节点</p><ul><li>其左子树中的每个节点的值，都要小于这个节点的值</li><li>右子树节点的值都大于这个节点的值</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Tree <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  root <span class="token operator">*</span>TreeNode
<span class="token punctuation">}</span>
<span class="token keyword">type</span> TreeNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  value <span class="token builtin">int</span>
  left <span class="token operator">*</span>TreeNode
  right <span class="token operator">*</span>TreeNode
<span class="token punctuation">}</span>
<span class="token comment">// NewTree 创建一颗空树</span>
<span class="token keyword">func</span> <span class="token function">NewTree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Tree <span class="token punctuation">{</span>
	<span class="token keyword">return</span> Tree<span class="token punctuation">{</span>root<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-必备方法" tabindex="-1"><a class="header-anchor" href="#_2-必备方法" aria-hidden="true">#</a> 2. 必备方法</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>	<span class="token comment">// 插入结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Find</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>		<span class="token comment">// 查找结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span> <span class="token comment">// 删除结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">PreOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span> <span class="token comment">// 先序遍历</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">InOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span> <span class="token comment">// 中序遍历</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Order</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span> <span class="token comment">// 后续遍历</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-插入和查找" tabindex="-1"><a class="header-anchor" href="#_2-1-插入和查找" aria-hidden="true">#</a> 2.1 插入和查找</h4><p>由其结构可以看出，可以很方便的查找一个数据，插入也是类似的方法</p><p><img src="https://static.mittacy.com/blog/20200403134817.jpg" alt=""></p><ul><li>实现插入</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Insert 插入结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	newNode <span class="token operator">:=</span> <span class="token operator">&amp;</span>TreeNode<span class="token punctuation">{</span>value<span class="token punctuation">:</span> val<span class="token punctuation">}</span>
	<span class="token comment">// 如果树为空，则直接作为根结点就可以了</span>
	<span class="token keyword">if</span> tree<span class="token punctuation">.</span>root <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		tree<span class="token punctuation">.</span>root <span class="token operator">=</span> newNode
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 其他情况需要左右查找</span>
	curNode <span class="token operator">:=</span> tree<span class="token punctuation">.</span>root
	<span class="token keyword">for</span> curNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// 比结点大，向右边</span>
		<span class="token keyword">if</span> val <span class="token operator">&gt;</span> curNode<span class="token punctuation">.</span>value <span class="token punctuation">{</span>
			<span class="token comment">// 如果右结点为空，那就插入该位置，否则继续查找</span>
			<span class="token keyword">if</span> curNode<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				curNode<span class="token punctuation">.</span>right <span class="token operator">=</span> newNode
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>right
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>	<span class="token comment">// 比结点小，向左边</span>
			<span class="token comment">// 如果左结点为空，那就插入该位置，否则继续查找</span>
			<span class="token keyword">if</span> curNode<span class="token punctuation">.</span>left <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				curNode<span class="token punctuation">.</span>left <span class="token operator">=</span> newNode
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>left
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实现查找</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Find 查找结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Find</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span>
	curNode <span class="token operator">:=</span> tree<span class="token punctuation">.</span>root
	<span class="token keyword">for</span> curNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// 等于该结点，返回</span>
		<span class="token keyword">if</span> val <span class="token operator">==</span> curNode<span class="token punctuation">.</span>value <span class="token punctuation">{</span>
			<span class="token keyword">return</span> curNode
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> val <span class="token operator">&lt;</span> curNode<span class="token punctuation">.</span>value <span class="token punctuation">{</span>
			<span class="token comment">// 小于结点，向左边</span>
			curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>left
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token comment">// 大于结点，向右边</span>
			curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>right
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-删除" tabindex="-1"><a class="header-anchor" href="#_2-2-删除" aria-hidden="true">#</a> 2.2 删除</h4><p>二叉查找树的查找、插入操作都比较简单易懂，但是它的删除操作就比较复杂了 ，有三种情况</p><p><img src="https://static.mittacy.com/blog/20200403142627.jpg" alt=""></p><ul><li><p>比如删除图中的55。它没有左右子节点，只需要直接将父节点中，指向要删除节点的指针置为 null</p></li><li><p>比如删除图中的13。它只有左右子节点其中一个。只需要让16指向13的指针指向15就可以了</p></li><li><p>比如删除图中的18。它有左右子节点，我们需要找到这个节点的右子树中的最小节点，把它替换到要删除的节点上。然后再删除掉这个最小节点，本例子是找到18右子树中的最小节点为19，19替换18，然后删除19</p><blockquote><p>注意19没有左节点，但是可以有右节点，所以需要执行函数删除19，不能直接让19的父节点指向nil，比如删除50的时候</p></blockquote></li></ul><p>总体逻辑就是：查找删除结点 A，如果有两个子节点，从右子树中找到最小节点 B，交换A、B节点值，则现在转化为删除Bc</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Delete 删除结点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">// 树为空，找不到错误</span>
	<span class="token keyword">if</span> tree<span class="token punctuation">.</span>root <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;the tree is empty&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// curNode 代表要删除的节点，curNodeFather 代表要curNode的父节点</span>
	curNode <span class="token operator">:=</span> tree<span class="token punctuation">.</span>root
	<span class="token keyword">var</span> curNodeFather <span class="token operator">*</span>TreeNode
	<span class="token keyword">for</span> curNode <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> val <span class="token operator">!=</span> curNode<span class="token punctuation">.</span>value <span class="token punctuation">{</span>
		curNodeFather <span class="token operator">=</span> curNode
		<span class="token keyword">if</span> val <span class="token operator">&gt;</span> curNode<span class="token punctuation">.</span>value <span class="token punctuation">{</span>
			curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>right
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>left
	<span class="token punctuation">}</span>
	<span class="token comment">// 没有找到</span>
	<span class="token keyword">if</span> curNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;the node no exists&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 删除的节点如果有两个子节点，处理成删除另一个节点</span>
	<span class="token keyword">if</span> curNode<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> curNode<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// 找到curNode右子树的最小节点</span>
		minNode <span class="token operator">:=</span> curNode<span class="token punctuation">.</span>right
		minNodeFather <span class="token operator">:=</span> curNode
		<span class="token keyword">for</span> minNode<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			minNodeFather <span class="token operator">=</span> minNode
			minNode <span class="token operator">=</span> minNode<span class="token punctuation">.</span>left
		<span class="token punctuation">}</span>
		<span class="token comment">// 将最小节点的值替换curNode的值</span>
		curNode<span class="token punctuation">.</span>value <span class="token operator">=</span> minNode<span class="token punctuation">.</span>value
		<span class="token comment">// 并且将curNode换到最小节点，即现在变成了要删除最小节点</span>
		curNode <span class="token operator">=</span> minNode
		curNodeFather <span class="token operator">=</span> minNodeFather
	<span class="token punctuation">}</span>
	<span class="token comment">// 删除节点肯定是叶子节点或者仅有一个子节点，因为上面的情况已经处理转化了</span>
	<span class="token comment">// 先保存curNode的子节点(如果有的话)</span>
	<span class="token keyword">var</span> curNodeChild <span class="token operator">*</span>TreeNode
	<span class="token keyword">if</span> curNode<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		curNodeChild <span class="token operator">=</span> curNode<span class="token punctuation">.</span>left
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> curNode<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		curNodeChild <span class="token operator">=</span> curNode<span class="token punctuation">.</span>right
	<span class="token punctuation">}</span>
	<span class="token comment">// 开始删除</span>
	<span class="token keyword">if</span> curNodeFather <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>	<span class="token comment">// 删除的是根节点</span>
		tree<span class="token punctuation">.</span>root <span class="token operator">=</span> curNodeChild
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> curNodeFather<span class="token punctuation">.</span>left <span class="token operator">==</span> curNode <span class="token punctuation">{</span>
		curNodeFather<span class="token punctuation">.</span>left <span class="token operator">=</span> curNodeChild
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		curNodeFather<span class="token punctuation">.</span>right <span class="token operator">=</span> curNodeChild
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-遍历" tabindex="-1"><a class="header-anchor" href="#_2-3-遍历" aria-hidden="true">#</a> 2.3 遍历</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// PreOrder 先序遍历</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">PreOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">PreNode</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>root<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">PreNode</span><span class="token punctuation">(</span>node <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> node <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
	<span class="token function">PreNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
	<span class="token function">PreNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// InOrder 中序遍历</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">InOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">InNode</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>root<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">InNode</span><span class="token punctuation">(</span>node <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> node <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token function">InNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
	<span class="token function">InNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// PostOrder 后序遍历</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">PostOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">PostNode</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>root<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">PostNode</span><span class="token punctuation">(</span>node <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> node <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
	<span class="token function">PostNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
	<span class="token function">PostNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-常用方法" tabindex="-1"><a class="header-anchor" href="#_3-常用方法" aria-hidden="true">#</a> 3. 常用方法</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Height</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>	<span class="token comment">// 获取树的高度</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Min</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span> <span class="token comment">// 最小值</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Max</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span> <span class="token comment">// 最大值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-求树的高度" tabindex="-1"><a class="header-anchor" href="#_3-1-求树的高度" aria-hidden="true">#</a> 3.1 求树的高度</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Height 获取树的高度</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Height</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>root<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>node <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> node <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 返回左右边比较高的节点+1</span>
	leftHeight <span class="token operator">:=</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
	rightHeight <span class="token operator">:=</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
	<span class="token keyword">if</span> leftHeight <span class="token operator">&gt;=</span> rightHeight <span class="token punctuation">{</span>
		<span class="token keyword">return</span> leftHeight <span class="token operator">+</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> rightHeight <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-最小-大值" tabindex="-1"><a class="header-anchor" href="#_3-2-最小-大值" aria-hidden="true">#</a> 3.2 最小/大值</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Min 最小值</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Min</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	curNode <span class="token operator">:=</span> tree<span class="token punctuation">.</span>root
	<span class="token keyword">if</span> curNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;The tree is empty.&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> curNode<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>left
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> curNode<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">// Max 最大值</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tree <span class="token operator">*</span>Tree<span class="token punctuation">)</span> <span class="token function">Max</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	curNode <span class="token operator">:=</span> tree<span class="token punctuation">.</span>root
	<span class="token keyword">if</span> curNode <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;The tree is empty.&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> curNode<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		curNode <span class="token operator">=</span> curNode<span class="token punctuation">.</span>right
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> curNode<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","index.html.vue"]]);export{r as default};
