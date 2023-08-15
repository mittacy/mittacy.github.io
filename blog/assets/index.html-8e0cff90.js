import{_ as n,o as s,c as a,a as e}from"./app-c399b13a.js";const t={},i=e(`<h2 id="一、安装" tabindex="-1"><a class="header-anchor" href="#一、安装" aria-hidden="true">#</a> 一、安装</h2><p><a href="https://juejin.cn/post/6844904147557285895#heading-1" target="_blank" rel="noopener noreferrer">使用Docker搭建ELK环境</a></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载</span>
$ <span class="token function">git</span> clone https://github.com/deviantony/docker-elk.git 

<span class="token comment"># 启动，过一会儿再访问，启动较慢</span>
$ <span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 重建内建用户密码，将输出的密码全部保存一下</span>
$ <span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-T</span> elasticsearch bin/elasticsearch-setup-passwords auto <span class="token parameter variable">--batch</span>
Changed password <span class="token keyword">for</span> user apm_system
PASSWORD apm_system <span class="token operator">=</span> YkELBJGOT6AxqsPqsi7I

Changed password <span class="token keyword">for</span> user kibana
PASSWORD kibana <span class="token operator">=</span> FxRwjm5KRYvHhGEnYTM9

Changed password <span class="token keyword">for</span> user logstash_system
PASSWORD logstash_system <span class="token operator">=</span> A4f5VOfjVWSdi0KAZWGu

Changed password <span class="token keyword">for</span> user beats_system
PASSWORD beats_system <span class="token operator">=</span> QnW8xxhnn7LMlA7vuI7B

Changed password <span class="token keyword">for</span> user remote_monitoring_user
PASSWORD remote_monitoring_user <span class="token operator">=</span> OvjEGR13wjkOkIbWqaEM

Changed password <span class="token keyword">for</span> user elastic
PASSWORD elastic <span class="token operator">=</span> PGevNMuv7PhVnaYg7vJw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>将 <code>docker-compose.yml&gt;ELASTIC_PASSWORD</code> 置位空</li><li>将配置文件内的<strong>elastic</strong> 密码修改为新的密码 <ul><li>kibana/config/kibana.yml</li><li>logstash/config/logstash.yml</li><li>logstash/pipeline/logstash.conf</li></ul></li><li>向 <code>kibana/config/kibana.yml</code> 中添加 <code>i18n.locale: &quot;zh-CN&quot;</code> 设置中文</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启</span>
$ <span class="token function">docker-compose</span> restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>访问kibana：localhost:5601</p><p>使用 elastic 和 PGevNMuv7PhVnaYg7vJw 登录</p><p>最后，可以在 kibana 中关闭付费</p><h2 id="二、工具使用" tabindex="-1"><a class="header-anchor" href="#二、工具使用" aria-hidden="true">#</a> 二、工具使用</h2><h3 id="_1-logstash" tabindex="-1"><a class="header-anchor" href="#_1-logstash" aria-hidden="true">#</a> 1. logstash</h3><p><strong>1.安装</strong></p><p>下载ElasticSearch对应版本的logstash后解压</p><p>https://www.elastic.co/cn/downloads/logstash</p><p><strong>2.使用</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">$logstash_path</span>
$ ./bin/logstash <span class="token parameter variable">-f</span> 配置文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，配置文件需要指向<code>csv数据文件</code>以及<code>csv数据文件的格式</code></p><h3 id="_2-安装分词器" tabindex="-1"><a class="header-anchor" href="#_2-安装分词器" aria-hidden="true">#</a> 2. 安装分词器</h3><p>以安装ik分词器为例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入容器</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> es容器id /bin/bash

<span class="token comment"># 安装wget</span>
$ yum <span class="token parameter variable">-i</span> <span class="token function">install</span> <span class="token function">wget</span>

<span class="token comment"># 下载ik，记得替换对应的版本号</span>
$ mdkir ik
$ <span class="token builtin class-name">cd</span> ik
$ <span class="token function">wget</span> https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip
$ <span class="token function">unzip</span> elasticsearch-analysis-ik-7.12.1.zip

<span class="token comment"># 重启服务</span>
$ <span class="token function">docker</span> restart es容器id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、基础知识" tabindex="-1"><a class="header-anchor" href="#三、基础知识" aria-hidden="true">#</a> 三、基础知识</h2><table><thead><tr><th>MySQL</th><th>ES</th></tr></thead><tbody><tr><td>Table 表</td><td>Index 索引</td></tr><tr><td>Row 行记录</td><td>Document 记录</td></tr><tr><td>Column 列</td><td>Field</td></tr><tr><td>Schema 表定义</td><td>Mapping</td></tr><tr><td>SQL</td><td>DSL</td></tr></tbody></table><h3 id="_1-索引" tabindex="-1"><a class="header-anchor" href="#_1-索引" aria-hidden="true">#</a> 1. 索引</h3><ul><li><p>名词</p><p>一个 ES 中，可以创建多个不同的索引，类似 Mysql 表</p></li><li><p>动词</p><p>保存一个文档到 ES 的过程也叫索引</p></li></ul><h3 id="_2-文档" tabindex="-1"><a class="header-anchor" href="#_2-文档" aria-hidden="true">#</a> 2. 文档</h3><h4 id="_2-1-概念" tabindex="-1"><a class="header-anchor" href="#_2-1-概念" aria-hidden="true">#</a> 2.1 概念</h4><p>类似 Mysql 表中的记录，ES是面向文档的，文档是所有可搜索数据的最小单位；</p><p>文档会被序列化成 JSON 格式保存在 ES 中，每个字段都有对应的字符类型（字符串、数值、布尔、日期、二进制、范围类型）</p><h4 id="_2-2-元数据" tabindex="-1"><a class="header-anchor" href="#_2-2-元数据" aria-hidden="true">#</a> 2.2 元数据</h4><p>用于标注文档的相关信息</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;movies&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">14.23223</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Toy Story&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;year&quot;</span><span class="token operator">:</span> <span class="token number">1995</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>_index</code> - 文档所属的索引名</li><li><code>_type</code> - 文档所属的类型名</li><li><code>_id</code> - 文档唯一ID，可以自己指定，一般通过 ES 自动生成</li><li><code>_source</code> - 文档的原始 JSON 数据</li><li><code>_version</code> - 文档的版本信息</li><li><code>_score</code> - 相关性打分</li><li><code>_all</code> - 整合所有字段内容，已被废除</li></ul><h3 id="_3-倒排索引" tabindex="-1"><a class="header-anchor" href="#_3-倒排索引" aria-hidden="true">#</a> 3. 倒排索引</h3><p>倒排索引包含两个部分：</p><ul><li><p>单词词典</p><p>记录所有文档的单词，记录 <strong>单词</strong> 到 <strong>倒排列表</strong> 的关联关系</p><blockquote><p>单词词典一般比较大，可以通过 B+树 或 哈希拉链法 实现，加快插入与查询</p></blockquote></li><li><p>倒排列表</p><p>记录了单词对应的文档结合，包含以下内容</p><ul><li>文档 ID</li><li>词频 TF - 该单词在文档中出现的次数，用于相关性评分</li><li>位置(Position) - 单词在文档中分词的位置，用于语句搜索</li><li>偏移(Offset) - 记录单词的开始、结束位置，实现高亮显示</li></ul></li></ul><p><strong>例子：</strong></p><table><thead><tr><th>文档ID</th><th>文档内容</th></tr></thead><tbody><tr><td>1</td><td>Mastering Elasticsearch</td></tr><tr><td>2</td><td>Elasticsearch Server</td></tr><tr><td>3</td><td>Elasticsearch Essentials</td></tr></tbody></table><p>上面的文档会有如下的关于 <strong>Elastcisearch</strong> 的倒排列表：</p><table><thead><tr><th>Doc Id</th><th>TF</th><th>Position</th><th>Offset</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>1</td><td>&lt;10,23&gt;</td></tr><tr><td>2</td><td>1</td><td>0</td><td>&lt;0,13&gt;</td></tr><tr><td>3</td><td>1</td><td>0</td><td>&lt;0,13&gt;</td></tr></tbody></table><h3 id="_4-分词" tabindex="-1"><a class="header-anchor" href="#_4-分词" aria-hidden="true">#</a> 4. 分词</h3><ul><li><p>Analysis：分词，把全文本转换为一系列单词的过程</p></li><li><p>Analyzer：分析器，按一定规则进行分词</p><blockquote><p>除了在数据写入时使用分析器进行分词，在匹配 Query 语句时也需要用相同的分析器对查询语句进行分析</p></blockquote></li></ul><h4 id="_4-1-分析器" tabindex="-1"><a class="header-anchor" href="#_4-1-分析器" aria-hidden="true">#</a> 4.1 分析器</h4><ol><li>Character Filters：原始文本处理，例如去除html</li><li>Tokenizer：按照规则切分为单词</li><li>Token Filters：将切分的单词进行加工，比如转化为小写等</li></ol><h4 id="_4-2-es自带分词器" tabindex="-1"><a class="header-anchor" href="#_4-2-es自带分词器" aria-hidden="true">#</a> 4.2 ES自带分词器</h4><ul><li>Standard：默认分词器，按词切分，小写处理</li><li>Simple：按照非字母切分（符号被过滤），小写处理</li><li>Stop：小写处理，停用词过滤（the、a、is）</li><li>Whitespace：安装空格切分，不转小写</li><li>Keyword：不分词，直接将输入当做输出</li><li>Patter：正则表达式，默认 <code>\\W+</code> （非字符分割）</li><li>Language：提供了30多种常见语言的分词器</li><li>Customer：自定义分词器 <ul><li>icu_analyzer 中文分词器</li><li>ik，支持自定义词库，支持热更新分词字典</li><li>THULAC，清华大学自然语言处理和社会人文计算机实验室的一套中文分词</li></ul></li></ul><h4 id="_4-3-分词测试接口" tabindex="-1"><a class="header-anchor" href="#_4-3-分词测试接口" aria-hidden="true">#</a> 4.3 分词测试接口</h4><p>如果想要查看一个文本被某个分词器处理的效果，可以使用 <code>_analyze</code> 接口</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;standard&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;My name is MingtaoChen&quot;</span>
<span class="token punctuation">}</span>
# 结果如下
<span class="token punctuation">{</span>
  <span class="token property">&quot;tokens&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;my&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&lt;ALPHANUM&gt;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&lt;ALPHANUM&gt;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;is&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&lt;ALPHANUM&gt;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;mingtaochen&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&lt;ALPHANUM&gt;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用自定义分析器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ GET /_analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;lowercase&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;My name is MingtaoChen&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用指定索引字段的分析器进行测试</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ GET user/_analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;name&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;My name is MingtaoChen&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-mapping" tabindex="-1"><a class="header-anchor" href="#_5-mapping" aria-hidden="true">#</a> 5. Mapping</h3><p>Mapping是对索引的结构定义，类似 Mysql 表结构定义</p><p>查看某个索引的Mapping</p><p><code>GET user/_mapping</code></p><h4 id="_5-1-字段数据类型" tabindex="-1"><a class="header-anchor" href="#_5-1-字段数据类型" aria-hidden="true">#</a> 5.1 字段数据类型</h4><ul><li>简单类型 <ul><li>Text / Keyword</li><li>Date</li><li>Integer / Floating</li><li>Boolean</li><li>IPv4 &amp; IPv6</li></ul></li><li>复杂类型 - 对象和嵌套对象 <ul><li>对象类型 / 嵌套类型</li></ul></li><li>特殊类型 <ul><li>geo_point &amp; geo_shape / percolator</li></ul></li></ul><h4 id="_5-2-dynamic-mapping" tabindex="-1"><a class="header-anchor" href="#_5-2-dynamic-mapping" aria-hidden="true">#</a> 5.2 Dynamic Mapping</h4><p>在写入文档时，如果索引不存在会自动创建索引并定义Mapping，ES 会自动根据文档信息，推算出字段的类型，但是有时候会推算错误，例如地理位置信息等</p><p><strong>配置Dynamic</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT user
<span class="token punctuation">{</span>
	<span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;_doc&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">&quot;dynamic&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;false&quot;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>dynamic不同设置，插入新文档有新增的字段时影响如下：</strong></p><table><thead><tr><th></th><th>true</th><th>false</th><th>strict</th></tr></thead><tbody><tr><td>文档可索引</td><td>y</td><td>y</td><td>n</td></tr><tr><td>字段可索引</td><td>y</td><td>n</td><td>n</td></tr><tr><td>Mapping被更新</td><td>y</td><td>n</td><td>n</td></tr></tbody></table><ul><li>false 情况下，Mapping不会更新，但是数据插入成功</li><li>strict 情况下，直接报错</li></ul><blockquote><p><strong>使用动态mapping的隐患</strong></p><ul><li>设置成strict，万一有一条数据里带着不存在的字段，写入就会失败</li><li>设置成true，数据可以写入，还会在mapping中增加那个字段的设置。随着时间的流逝，这类数据会导致mapping设定的膨胀</li></ul></blockquote><h4 id="_5-3-定义mapping" tabindex="-1"><a class="header-anchor" href="#_5-3-定义mapping" aria-hidden="true">#</a> 5.3 定义Mapping</h4><p>为减少输入的工作量和出错概率，可以依照一下步骤：</p><ol><li><p>使用一些样本数据创建一个临时的 index</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /user_demo/_doc
<span class="token punctuation">{</span>
  <span class="token property">&quot;app_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;appsldfms&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;community_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;c_5basf9e685_aksdfmlsmf32e&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;user_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;u_5basdfdsf_asd9wDz3e8&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;nick_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;不会扎头的小丸子&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;wx_avatar&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;wx_unionid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;aosdjf&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;state&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;is_quit&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;created_at&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2018-10-11 09:27:11&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;updated_at&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2021-06-05 06:03:56&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;need_notify&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;subscribe_from&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>获取该 index 的动态 Mapping 定义</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /user_demo/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>根据需求对该 Mapping 进行修改，使用新的 Mapping 配置创建索引</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /user
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;app_id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;community_id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;created_at&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;is_quit&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;need_notify&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;nick_name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index_options&quot;</span><span class="token operator">:</span> <span class="token string">&quot;offsets&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fields&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;keyword&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;ignore_above&quot;</span> <span class="token operator">:</span> <span class="token number">256</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;state&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;subscribe_from&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;updated_at&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;user_id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;wx_avatar&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;wx_unionid&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除临时索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE /user_demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><blockquote><ul><li><p>index：控制字段是否被索引</p></li><li><p>index_options：控制倒排索引记录的内容</p><ul><li>docs：记录 doc id</li><li>freqs：记录 doc id 和 term frequencies</li><li>position：记录 doc id、term frequencies、term position</li><li>offsets：doc id、term frequencies、term position、character offects</li></ul></li></ul><p>text类型默认记录 positions，其他默认为 docs，记录内容越多，占用存储空间越大</p></blockquote><h2 id="四、集群" tabindex="-1"><a class="header-anchor" href="#四、集群" aria-hidden="true">#</a> 四、集群</h2><h3 id="_1-节点" tabindex="-1"><a class="header-anchor" href="#_1-节点" aria-hidden="true">#</a> 1. 节点</h3><ul><li>节点是一个 ES 实例，本质上就是一个Java进程，一台机器可以运行多个 ES 实例，但是生产环境一般建议一台机器值运行一个 ES 实例</li><li>每个节点都有名字，通过配置文件配置，或者启动时 <code>-E node.name=nodeName</code> 指定</li><li>每个节点启动之后，会分配一个 UID，保存在 data 目录下</li></ul><h4 id="_1-1-master-eligible-node" tabindex="-1"><a class="header-anchor" href="#_1-1-master-eligible-node" aria-hidden="true">#</a> 1.1 Master-eligible Node</h4><blockquote><p>Master node 主节点，可以有多个 Master 节点，但是只能有一个active</p><p>Master-eligible nodes 可以参加选主流程成为 Master 的节点</p></blockquote><ul><li><strong>第一个启动</strong>的节点会将自己选举成 Master 节点，其他节点启动后默认就是 Master eligible 节点，可以设置 <code>node.master: false</code> 禁止，禁止的节点将不会参加选主流程</li><li>每个节点上都保存了集群的状态，<strong>只有 Master 节点才能修改集群的状态信息</strong></li><li>集群信息（Cluster State）维护了一个集群中必要的信息： <ul><li>所有的节点信息</li><li>所有的索引和其相关的 Mapping 与 Setting 信息</li><li>分片的路由信息</li></ul></li></ul><h4 id="_1-2-data-node" tabindex="-1"><a class="header-anchor" href="#_1-2-data-node" aria-hidden="true">#</a> 1.2 Data Node</h4><p>可以保存数据的节点，叫做 Data Node。负责保存分片数据，在数据扩展上起到了至关重要的作用</p><h4 id="_1-3-coordinating-node" tabindex="-1"><a class="header-anchor" href="#_1-3-coordinating-node" aria-hidden="true">#</a> 1.3 Coordinating Node</h4><ul><li>负责接收 Client 的请求，将请求分发到合适的节点，最终把结果汇集到一起</li><li>每个节点默认都起到了 Coordinating Node 的职责</li></ul><h4 id="_1-4-hot-warm-node" tabindex="-1"><a class="header-anchor" href="#_1-4-hot-warm-node" aria-hidden="true">#</a> 1.4 Hot &amp; Warm Node</h4><p>不同硬件配置的 Data Node，用来实现 Hot &amp; Warm 架构，降低集群部署的成本</p><h4 id="_1-5-machine-learning-node" tabindex="-1"><a class="header-anchor" href="#_1-5-machine-learning-node" aria-hidden="true">#</a> 1.5 Machine Learning Node</h4><p>负责跑机器学习的任务，用来做异常检测</p><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h4><p>开发环境中一个可以承担多种角色，但生产环境中，应该设置节点单一的角色</p><p>节点相关配置参数如下：</p><table><thead><tr><th>节点类型</th><th>配置参数</th><th>默认值</th></tr></thead><tbody><tr><td>Master-eligible</td><td>node.master</td><td>true</td></tr><tr><td>data</td><td>node.data</td><td>true</td></tr><tr><td>ingest</td><td>node.ingest</td><td>true</td></tr><tr><td>coordinating only</td><td>无</td><td>每个节点默认都是(设置其他类型都为false)</td></tr><tr><td>macheine learning</td><td>node.ml</td><td>true(需enable x-pack)</td></tr></tbody></table><h3 id="_2-分片" tabindex="-1"><a class="header-anchor" href="#_2-分片" aria-hidden="true">#</a> 2. 分片</h3><ul><li><p>主分片（Primary Shard）</p><p>主分片可以将数据分布到集群内的所有节点上，一个分片是一个运行的 Lucene 实例，解决数据水平扩展的问题。<strong>主分片数量在索引创建时指定，后续不允许修改，除非重建索引。</strong></p></li><li><p>副本（Replica Shard）</p><p>是主分片的拷贝，数量可以动态地调整，增加副本数在一定程度上提高服务的可用性、读取的吞吐</p></li></ul><h4 id="分片数设置" tabindex="-1"><a class="header-anchor" href="#分片数设置" aria-hidden="true">#</a> 分片数设置</h4><ul><li>设置数量过少 <ul><li>可能导致后续增加节点后分片少于节点数，将无法实现水平扩展</li><li>单个分片的数据量太大，导致数据重新分配耗时</li></ul></li><li>设置数量过多 <ul><li>单个节点过多的分片，会导致资源浪费，同时影响性能</li><li>影响搜索结果的相关性打分，影响统计结果的准确性</li></ul></li></ul><p><strong>从7.0开始，默认主分片数为1</strong></p><h3 id="_3-获取集群健康状态" tabindex="-1"><a class="header-anchor" href="#_3-获取集群健康状态" aria-hidden="true">#</a> 3. 获取集群健康状态</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET _cluster/health
<span class="token punctuation">{</span>
  <span class="token property">&quot;cluster_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;docker-cluster&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;status&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;yellow&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;number_of_nodes&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;number_of_data_nodes&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;active_primary_shards&quot;</span> <span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token property">&quot;active_shards&quot;</span> <span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token property">&quot;relocating_shards&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;initializing_shards&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;unassigned_shards&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;delayed_unassigned_shards&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;number_of_pending_tasks&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;number_of_in_flight_fetch&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;task_max_waiting_in_queue_millis&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;active_shards_percent_as_number&quot;</span> <span class="token operator">:</span> <span class="token number">93.10344827586206</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>status <ul><li>green 主分片与副本都正常分配</li><li>yellow 主分片正常分配，有副本分配未能正常分配</li><li>red 有主分片未能分配，例如当服务器的磁盘容量超过85%时去创建了一个新的索引</li></ul></li><li><code>active_primary_shards</code> 集群中的主分片数量，涵盖了所有索引的汇总值</li><li><code>active_shards</code> 集群中的分片数量，涵盖了所有索引的汇总值</li><li><code>relocating_shards</code> 显示当前正在从一个节点迁往其他节点的分片的数量。通常来说应该是 0，不过在 Elasticsearch 发现集群不太均衡时，该值会上涨。比如说：添加了一个新节点，或者下线了一个节点。</li><li><code>initializing_shards</code> 是刚刚创建的分片的个数。比如，当你刚创建第一个索引，分片都会短暂的处于 <code>initializing</code> 状态。这通常会是一个临时事件，分片不应该长期停留在 <code>initializing</code> 状态。你还可能在节点刚重启的时候看到 <code>initializing</code> 分片：当分片从磁盘上加载后，它们会从 <code>initializing</code> 状态开始。</li><li><code>unassigned_shards</code> 是已经在集群状态中存在的分片，但是实际在集群里又找不着。通常未分配分片的来源是未分配的副本。比如，一个有 5 分片和 1 副本的索引，在单节点集群上，就会有 5 个未分配副本分片。如果你的集群是 <code>red</code> 状态，也会长期保有未分配分片（因为缺少主分片）</li></ul><h2 id="五、基础操作" tabindex="-1"><a class="header-anchor" href="#五、基础操作" aria-hidden="true">#</a> 五、基础操作</h2><h3 id="_1-索引-1" tabindex="-1"><a class="header-anchor" href="#_1-索引-1" aria-hidden="true">#</a> 1. 索引</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 新建索引</span>
$ PUT user

<span class="token comment"># 删除索引</span>
$ DELETE user

<span class="token comment"># 查看所有索引信息</span>
$ GET /_cat/indices?v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-文档-1" tabindex="-1"><a class="header-anchor" href="#_2-文档-1" aria-hidden="true">#</a> 2. 文档</h3><h4 id="_2-1-创建" tabindex="-1"><a class="header-anchor" href="#_2-1-创建" aria-hidden="true">#</a> 2.1 创建</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 PUT 幂等性，需指定id</span>
$ PUT /users/_doc/1 
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;wsj&quot;</span>,
  <span class="token string">&quot;age&quot;</span>:20
<span class="token punctuation">}</span>

$ POST /users/_doc
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;wsj2&quot;</span>,
  <span class="token string">&quot;age&quot;</span>:21
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-删除" tabindex="-1"><a class="header-anchor" href="#_2-2-删除" aria-hidden="true">#</a> 2.2 删除</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ DELETE /users/_doc/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-3-更新" tabindex="-1"><a class="header-anchor" href="#_2-3-更新" aria-hidden="true">#</a> 2.3 更新</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 更新,可以增加字段，也可以更新原来字段的值</span>
$ POST users/_update/2
<span class="token punctuation">{</span>
    <span class="token string">&quot;doc&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;wsj3&quot;</span>,
        <span class="token string">&quot;age&quot;</span>:23,
        <span class="token string">&quot;gender&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;male&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-查询" tabindex="-1"><a class="header-anchor" href="#_2-4-查询" aria-hidden="true">#</a> 2.4 查询</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询id为1的文档</span>
$ GET /users/_doc/1

<span class="token comment"># 只查询部分字段，用逗号隔开</span>
$ GET /users/_doc/1?_source<span class="token operator">=</span>name,gender

<span class="token comment"># 当字段较多时，可以选择包括和排除字段</span>
$ GET /users/_doc/1?_source_includes<span class="token operator">=</span>name<span class="token operator">&amp;</span><span class="token assign-left variable">_souce_excludes</span><span class="token operator">=</span>age

<span class="token comment"># 如果只想得到 _source 字段，不需要任何元数据，使用 _source 端点</span>
$ GET /users/_doc/1/_source


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-mget" tabindex="-1"><a class="header-anchor" href="#_2-5-mget" aria-hidden="true">#</a> 2.5 mget</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ GET _mget
<span class="token punctuation">{</span>
  <span class="token string">&quot;docs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;user&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;user&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-6-bulk" tabindex="-1"><a class="header-anchor" href="#_2-6-bulk" aria-hidden="true">#</a> 2.6 bulk</h4><p>与 <code>mget</code> 可以使我们一次取回多个文档同样的方式， <code>bulk</code> API 允许在单个步骤中进行多次 <code>create</code> 、 <code>index</code> 、 <code>update</code> 或 <code>delete</code> 请求，多条操作中的单条操作失败并不会影响其他操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span> action: <span class="token punctuation">{</span> metadata <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> request body        <span class="token punctuation">}</span>
<span class="token punctuation">{</span> action: <span class="token punctuation">{</span> metadata <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> request body        <span class="token punctuation">}</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;delete&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;website&quot;</span>, <span class="token string">&quot;_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;blog&quot;</span>, <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;123&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> 
<span class="token punctuation">{</span> <span class="token string">&quot;create&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;website&quot;</span>, <span class="token string">&quot;_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;blog&quot;</span>, <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;123&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;My first blog post&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span>  <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;website&quot;</span>, <span class="token string">&quot;_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;blog&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;My second blog post&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;update&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;website&quot;</span>, <span class="token string">&quot;_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;blog&quot;</span>, <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;123&quot;</span>, <span class="token string">&quot;_retry_on_conflict&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;doc&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;My updated blog post&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>请注意 <code>delete</code> 动作不能有请求体,它后面跟着的是另外一个操作</p></li><li><p>谨记最后一个换行符不要落下</p></li><li><p>不要一次请求操作过多</p><blockquote><p>整个批量请求都需要由接收到请求的节点加载到内存中，因此该请求越大，其他请求所能获得的内存就越少。 批量请求的大小有一个最佳值，大于这个值，性能将不再提升，甚至会下降。 但是最佳值不是一个固定的值。它完全取决于硬件、文档的大小和复杂度、索引和搜索的负载的整体情况。</p><p>幸运的是，很容易找到这个 <em>最佳点</em> ：通过批量索引典型文档，并不断增加批量大小进行尝试。 当性能开始下降，那么你的批量大小就太大了。一个好的办法是开始时将 1,000 到 5,000 个文档作为一个批次, 如果你的文档非常大，那么就减少批量的文档个数。</p><p>密切关注你的批量请求的物理大小往往非常有用，一千个 1KB 的文档是完全不同于一千个 1MB 文档所占的物理大小。 一个好的批量大小在开始处理后所占用的物理大小约为 5-15 MB</p></blockquote></li></ul><h2 id="六、搜索" tabindex="-1"><a class="header-anchor" href="#六、搜索" aria-hidden="true">#</a> 六、搜索</h2><ul><li>url查询</li><li>Query DSL查询(建议)</li></ul><h3 id="_1-索引-2" tabindex="-1"><a class="header-anchor" href="#_1-索引-2" aria-hidden="true">#</a> 1. 索引</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 单个索引</span>
GET /movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,	<span class="token comment"># 显示es如何搜索的</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 多个个索引</span>
GET /movies,user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-query语法" tabindex="-1"><a class="header-anchor" href="#_2-query语法" aria-hidden="true">#</a> 2. query语法</h3><h4 id="_2-1-query-string" tabindex="-1"><a class="header-anchor" href="#_2-1-query-string" aria-hidden="true">#</a> 2.1 Query String</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>, 
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;default_field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;name&quot;</span>, 
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;!mittacy chen&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>支持 AND、OR、NOT、&amp;&amp;、||、!</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>, 
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span>, <span class="token string">&quot;about&quot;</span><span class="token punctuation">]</span>, 
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;(Ruan AND Yiming) OR (Java AND Elasticsearch)&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-simple-query-string" tabindex="-1"><a class="header-anchor" href="#_2-2-simple-query-string" aria-hidden="true">#</a> 2.2 Simple Query String</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>, 
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;simple_query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mittacy chen&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>,
      <span class="token string">&quot;default_operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;AND&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只支持 + / - / |，不支持 AND / NOT / OR，各个词之间的关系默认为 或，可以指定Operator</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>, 
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;simple_query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;-mittacy +chen&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-短语搜索" tabindex="-1"><a class="header-anchor" href="#_2-2-短语搜索" aria-hidden="true">#</a> 2.2 短语搜索</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询包含 &quot;mittacy chen&quot;，要求中间不能有其他字符</span>
GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mittacy chen&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 查询包含 &quot;mittacy chen&quot;，中间可以有其他字符</span>
GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mittacy chen&quot;</span>,
      <span class="token string">&quot;slop&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 搜索名字包含chen的文档</span>
GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;chen&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment"># 搜索名字包含chen不包含mittacy的文档</span>
GET /user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;chen&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;must_not&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mittacy&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-分页" tabindex="-1"><a class="header-anchor" href="#_3-分页" aria-hidden="true">#</a> 3. 分页</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>越往后的翻页成本越高</p><h3 id="_4-选择指定字段" tabindex="-1"><a class="header-anchor" href="#_4-选择指定字段" aria-hidden="true">#</a> 4 选择指定字段</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;order_date&quot;</span>, <span class="token string">&quot;_id&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-排序" tabindex="-1"><a class="header-anchor" href="#_5-排序" aria-hidden="true">#</a> 5. 排序</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
  	<span class="token punctuation">{</span><span class="token string">&quot;order_date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最好在 “数字型” 或 “日期型” 字段上排序，因为对于多值类型或分析过的字段排序，系统会选一个值，无法得知该值</p><h3 id="_6-脚本字段" tabindex="-1"><a class="header-anchor" href="#_6-脚本字段" aria-hidden="true">#</a> 6. 脚本字段</h3><p>对旧字段进行操作生成新字段名并进行排序返回</p><p>比如订单中有不同的汇率，需要结合汇率对订单价格进行操作后再进行排序</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET user/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;script_fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;new_FIELD&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;script&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>, 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,143),p=[i];function o(l,c){return s(),a("div",null,p)}const r=n(t,[["render",o],["__file","index.html.vue"]]);export{r as default};
