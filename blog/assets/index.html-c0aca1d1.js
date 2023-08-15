import{_ as n,o as s,c as a,a as t}from"./app-a6a5d4a7.js";const e={},p=t(`<h3 id="_1-什么是json-schema" tabindex="-1"><a class="header-anchor" href="#_1-什么是json-schema" aria-hidden="true">#</a> 1. 什么是JSON Schema</h3><p>JSON Schema本身就是一种数据结构，可以清晰的描述JSON数据的结构，是一种描述JSON数据的JSON数据</p><h3 id="_2-使用json-schema的好处" tabindex="-1"><a class="header-anchor" href="#_2-使用json-schema的好处" aria-hidden="true">#</a> 2. 使用JSON Schema的好处</h3><ul><li>JSON Schema从Java的基本数据类型中对JSON结构进行校验，所以对JSON结构的校验可以理解为对每种不同数据类型的相应校验</li><li>接口测试中可以快速的定位到自己数据格式的正确性</li><li>JSON Schema 非常适用于基于JSON的HTTP的API</li></ul><h3 id="_3-常用关键字" tabindex="-1"><a class="header-anchor" href="#_3-常用关键字" aria-hidden="true">#</a> 3. 常用关键字</h3><p>JSON Schema实例</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;$schema&quot;</span><span class="token operator">:</span><span class="token string">&quot;http://json-schema.org/draft-04/schema#&quot;</span><span class="token punctuation">,</span>
  	<span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;$ref&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#/definitions/positiveInteger&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;book info&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span><span class="token string">&quot;some information about book&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;description&quot;</span><span class="token operator">:</span><span class="token string">&quot;The unique identifier for a book&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;integer&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span><span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pattern&quot;</span><span class="token operator">:</span><span class="token string">&quot;^#([0-9a-fA-F]{6}$&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maxLength&quot;</span><span class="token operator">:</span><span class="token number">6</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minLength&quot;</span><span class="token operator">:</span><span class="token number">6</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;price&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;multipleOf&quot;</span><span class="token operator">:</span><span class="token number">0.5</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum&quot;</span><span class="token operator">:</span><span class="token number">12.5</span><span class="token punctuation">,</span>
            <span class="token property">&quot;exclusiveMaximum&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span><span class="token number">2.5</span><span class="token punctuation">,</span>
            <span class="token property">&quot;exclusiveMinimum&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tags&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;array&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;items&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;minLength&quot;</span><span class="token operator">:</span><span class="token number">5</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span><span class="token number">10</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;additionalItems&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;minLength&quot;</span><span class="token operator">:</span><span class="token number">2</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minItems&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maxItems&quot;</span><span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>
            <span class="token property">&quot;uniqueItems&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;minProperties&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;maxProperties&quot;</span><span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token property">&quot;required&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;price&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键字：</p><table><thead><tr><th>关键字</th><th>描述</th></tr></thead><tbody><tr><td>$schema</td><td>声明是JSON Schema，而不是JSON</td></tr><tr><td>title</td><td>一般用来进行简单的描述，可以省略</td></tr><tr><td>description</td><td>一般是进行详细的描述信息，可以省略</td></tr><tr><td>type</td><td>用来约束校验的JSON元素的数据类型，必须是一个JSON对象</td></tr><tr><td>properties</td><td>定义各个字段属性</td></tr><tr><td>required</td><td>是一个数组，数组中的字符串表示必须要有的属性</td></tr><tr><td>maxLength</td><td>最大长度</td></tr><tr><td>minLength</td><td>最小长度</td></tr><tr><td>pattern</td><td>如果正则表达式匹配成功则有效</td></tr><tr><td>$ref</td><td>用来引用其他的schema</td></tr></tbody></table><h3 id="_4-type常见取值" tabindex="-1"><a class="header-anchor" href="#_4-type常见取值" aria-hidden="true">#</a> 4. type常见取值</h3><table><thead><tr><th>取值</th><th>对应的Java数据类型</th></tr></thead><tbody><tr><td>object</td><td>java.lang.Object</td></tr><tr><td>array</td><td>java.util.List</td></tr><tr><td>integer</td><td>int (java.lang.Integer)</td></tr><tr><td>number</td><td>float (java.lang.Float) 或 int</td></tr><tr><td>null</td><td>null</td></tr><tr><td>boolean</td><td>java.lang.Boolean</td></tr><tr><td>string</td><td>java.lang.String</td></tr></tbody></table><h4 id="_4-1-object类型" tabindex="-1"><a class="header-anchor" href="#_4-1-object类型" aria-hidden="true">#</a> 4.1 object类型</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  	……
    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;description&quot;</span><span class="token operator">:</span><span class="token string">&quot;The unique identifier for a book&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;integer&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span><span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;price&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;exclusiveMinimum&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;patternProperties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;^a&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;number&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;^b&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;string&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;additionalProperties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;number&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;minProperties&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;maxProperties&quot;</span><span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token property">&quot;required&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;price&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>关键字</th><th>描述</th></tr></thead><tbody><tr><td>type</td><td>类型</td></tr><tr><td>properties</td><td>定义各个字段属性</td></tr><tr><td>patternProperties</td><td>正则匹配定义各个字段属性</td></tr><tr><td>required</td><td>必须要有的属性</td></tr><tr><td>minProperties(maxProperties)</td><td>最小(大)属性个数</td></tr><tr><td>additionalProperties</td><td>如果待校验JSON对象中存在，既没有在properties中被定义，又没有在patternProperties中被定义，那么这些一级key必须通过additionalProperties的校验</td></tr></tbody></table><h4 id="_4-2-array" tabindex="-1"><a class="header-anchor" href="#_4-2-array" aria-hidden="true">#</a> 4.2 array</h4><p>array 有三个独立的属性：items、minItems、uniqueItems</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  ......
  <span class="token punctuation">{</span>
    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;array&quot;</span><span class="token punctuation">,</span>
	  <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minLength&quot;</span><span class="token operator">:</span> <span class="token number">5</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;minItems&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;maxItems&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token property">&quot;uniqueItems&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>关键字</th><th>描述</th></tr></thead><tbody><tr><td>items</td><td>array每个元素的类型</td></tr><tr><td>minItems &amp; maxItems</td><td>数组最小(大)的元素个数「省略minItems则为0, 省略maxItems则没有最大限制」</td></tr><tr><td>uniqueItems</td><td>每个元素都不相同</td></tr></tbody></table><h4 id="_4-3-integer-number" tabindex="-1"><a class="header-anchor" href="#_4-3-integer-number" aria-hidden="true">#</a> 4.3 integer &amp; number</h4><p>integer和number的区别，integer相当于Java中的int类型；而number相当于Java中的int或float类型，number 关键字可以描述任意长度，任意小数点的数字</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;multipleOf&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;maximum&quot;</span><span class="token operator">:</span> <span class="token number">12.5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;exclusiveMaximum&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;minimum&quot;</span><span class="token operator">:</span> <span class="token number">2.5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;exclusiveMinimum&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>关键字</th><th>描述</th></tr></thead><tbody><tr><td>minimum / maximum</td><td>最小(大)值</td></tr><tr><td>exclusiveMinimum / exclusiveMaximum</td><td>存在且为 true，则必须小于(大于) minimum(maximum)的值；省略或为false，则必须&lt;=(&gt;=) inimum(maximum) 的值</td></tr><tr><td>multpleOf</td><td>必须是某个数的倍数，比如<code>multipleOf: 0.5</code> 则必须是0.5的倍数</td></tr></tbody></table><h4 id="_4-4-string" tabindex="-1"><a class="header-anchor" href="#_4-4-string" aria-hidden="true">#</a> 4.4 string</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  ……
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  	<span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  		<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
  		<span class="token property">&quot;pattern&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
		<span class="token punctuation">}</span>
		<span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;phoneNumber&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;pattern&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token punctuation">}</span>
		<span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;email&quot;</span>
    <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	……
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="format-取值" tabindex="-1"><a class="header-anchor" href="#format-取值" aria-hidden="true">#</a> format 取值</h5><ul><li>data-time</li><li>email</li><li>hostname</li><li>ipv4</li><li>ipv6</li><li>uri</li><li>uri-reference</li><li>Uri-template</li><li>json-pointer</li></ul><p>例如：如果待校验的JSON元素正好是一个邮箱地址，那么，我们就可以使用format关键字进行校验，而不必通过pattern关键字指定复杂的正则表达式进行校验</p><h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h4><h4 id="_4-5-enum" tabindex="-1"><a class="header-anchor" href="#_4-5-enum" aria-hidden="true">#</a> 4.5 enum</h4><p>该关键字的值是一个数组，该数组至少要有一个元素，且数组内的每一个元素都是唯一的</p><p>如果待校验的JSON元素和数组中的某一个元素相同，则通过校验。否则，无法通过校验</p><p>注意，该数组中的元素值可以是任何值，包括null</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
	<span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;street_type&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;enum&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;Street&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;Avenue&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;Boulevard&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>参考链接：</p><p><a href="https://www.jianshu.com/p/1711f2f24dcf?utm_campaign=hugo" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/1711f2f24dcf?utm_campaign=hugo</a></p>`,36),o=[p];function i(r,u){return s(),a("div",null,o)}const c=n(e,[["render",i],["__file","index.html.vue"]]);export{c as default};
