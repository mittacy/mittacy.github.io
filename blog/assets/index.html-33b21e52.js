import{_ as s,o as n,c as a,a as e}from"./app-a6a5d4a7.js";const i={},l=e(`<p><a href="http://redisdoc.com/index.html" target="_blank" rel="noopener noreferrer">Redis文档</a></p><h2 id="一-mac安装与启动" tabindex="-1"><a class="header-anchor" href="#一-mac安装与启动" aria-hidden="true">#</a> 一. Mac安装与启动</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ brew <span class="token function">install</span> redis
To have launchd start redis now and restart at login:
  brew services start redis
Or, <span class="token keyword">if</span> you don&#39;t want/need a background <span class="token function">service</span> you can just run:
  redis-server /usr/local/etc/redis.conf
<span class="token operator">==</span><span class="token operator">&gt;</span> Summary
🍺  /usr/local/Cellar/redis/5.0.6: <span class="token number">13</span> files, <span class="token number">3</span>.1MB
<span class="token comment"># 配置文件路径: /usr/local/etc/redis.conf</span>
<span class="token comment"># 安装路径: /usr/local/Cellar/redis/5.0.6</span>
<span class="token comment"># 启动</span>
$ redis-server /usr/local/etc/redis.conf
<span class="token comment"># 启动并在后台运行</span>
$ brew services start redis
<span class="token comment"># 连接</span>
$ redis-cli <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p</span> <span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><p>redis默认是前台启动,不是以守护进程的方式进行:<code>daemonize no</code>,把这里修改成<code>yes</code>,就可以让redis以守护进程的方式启动</p></li><li><p>当redis使用守护进程方式运行,会默认把pid写入/var/run/reids.pid文件中,可以通过<code>pidfile /var/run/redis.pid</code>进行指定</p></li><li><p>端口号指定,默认是<code>6379</code>,可以根据需要自己修改</p></li><li><p>客户端如果一直连接着不释放的话会自动关闭连接,这是通过<code>timeout 100</code>来设定的,如果设置为0表示不会自动关闭</p></li><li><p>设置redis数据库的数量, databases 16 默认是16</p></li></ol><h2 id="二-数据类型" tabindex="-1"><a class="header-anchor" href="#二-数据类型" aria-hidden="true">#</a> 二. 数据类型</h2><ul><li>string 字符串</li><li>Hash 哈希</li><li>list 列表</li><li>set 集合</li><li>zset 有序集合</li></ul><h3 id="_1-string" tabindex="-1"><a class="header-anchor" href="#_1-string" aria-hidden="true">#</a> 1.string</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> hello world
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get hello
world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>SET key value [EX seconds] [PX milliseconds] [NX|XX]</p><p>EX表示秒，PX表示毫秒</p><p>NX表示只在键不存在时才对键进行设置操作，XX表示只在键已经存在时才对键进行设置操作</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 只有当hello不存在或过期的时候才对其操作</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> hello world EX <span class="token number">100</span> NX
<span class="token comment"># 100s内对其覆盖操作</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> hello newWorld EX <span class="token number">10</span> NX
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-hash" tabindex="-1"><a class="header-anchor" href="#_2-hash" aria-hidden="true">#</a> 2.hash</h3><p>Redis hash 是一个 string 类型的 key 和 value 的映射表，hash 特别适合用于存储对象</p><p>string 是 一个 key - value 键值对，而 hash 是多个 key - value 键值对</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset Jack name Jack
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset Jack age <span class="token number">20</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset Jack class <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token comment"># 获取 hash-key 这个 hash 里面的所有键值对</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hgetall Jack
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;Jack&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;20&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;class&quot;</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;2&quot;</span>
<span class="token comment"># 删除 hash-key 这个 hash 里面的 age 键值对</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hdel Jack age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hget Jack age
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token comment"># 删除整个hash</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> del Jack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-list" tabindex="-1"><a class="header-anchor" href="#_3-list" aria-hidden="true">#</a> 3.list</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> rpush color blue
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> rpush color white
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> rpush color red
<span class="token comment"># 获取某个list元素</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lindex color <span class="token number">1</span>
<span class="token string">&quot;red&quot;</span>
<span class="token comment"># 按索引遍历list</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lrange color <span class="token number">0</span> <span class="token number">1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token comment"># 遍历整个list, 即0~-1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lrange color <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
<span class="token comment"># 删除一个list，删除的是最后的元素blue	</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lpop color
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lrange color <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-set" tabindex="-1"><a class="header-anchor" href="#_4-set" aria-hidden="true">#</a> 4.set</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sadd color blue
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sadd color white
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sadd color red
<span class="token comment"># 获取整个set</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> smembers color
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
<span class="token comment"># 添加重复元素查看，没有变化</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sadd color blue
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> smembers color
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>redis 的 set 是一个 key 对应着 多个字符串类型的 value，也是一个字符串类型的集合</p><p>但是和 list 不同的是 set 中的字符串集合元素不能重复，但是 list 可以</p><h3 id="_5-zset" tabindex="-1"><a class="header-anchor" href="#_5-zset" aria-hidden="true">#</a> 5.Zset</h3><p>zset 和 set 一样都是 字符串类型元素的集合，并且集合内的元素不能重复。</p><p>不同的是，zset 每个元素都会关联一个 double 类型的分数。redis 通过分数来为集合中的成员进行从小到大的排序。</p><p>zset 的元素是唯一的，但是分数（score）却可以重复</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zadd zcolor <span class="token number">100</span> blue
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zadd zcolor <span class="token number">200</span> red
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zadd zcolor <span class="token number">150</span> white
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zrange zcolor <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到red最大排在了最后，如果重复元素并保持分数不变呢</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zadd zcolor <span class="token number">200</span> red
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zrange zcolor <span class="token number">0</span> <span class="token parameter variable">-1</span> withscores
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;100&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;150&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;200&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>red没有变化，如果重复元素并改变分数呢</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zadd zcolor <span class="token number">120</span> red
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zrange zcolor <span class="token number">0</span> <span class="token parameter variable">-1</span> withscores
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;blue&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;100&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;red&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;120&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;white&quot;</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;150&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到red变成了120，排到了white前面</p><h3 id="_6-数据淘汰策略" tabindex="-1"><a class="header-anchor" href="#_6-数据淘汰策略" aria-hidden="true">#</a> 6. 数据淘汰策略</h3><ul><li>volatile-lru：从已设置过期时间的数据集中挑选<strong>最近最少使用</strong>的数据淘汰</li><li>volatile-ttl：从已设置过期时间的数据集中挑选<strong>将要过期</strong>的数据淘汰</li><li>volatile-random：从已设置过期时间的数据集中<strong>任意选择</strong>数据淘汰</li><li>Volatile-flu：从已设置过期时间的数据集挑选使用<strong>频率最低</strong>的数据淘汰</li><li>Allkeys-lru：从数据集中挑选<strong>最近最少使用</strong>的数据淘汰</li><li>Allkeys-random：从数据集中任意选择数据淘汰</li><li>Allkeys-flu：从数据集中挑选使用频率最低的数据淘汰</li><li>no-enviction（驱逐）：禁止驱逐数据，这也是默认策略。 <ul><li>当内存不足以容纳新入数据时，新写入操作就会报错，请求可以继续进行，线上任务也不能持续进行，采用no-enviction策略可以保证数据不被丢失。</li></ul></li></ul><h4 id="淘汰机制" tabindex="-1"><a class="header-anchor" href="#淘汰机制" aria-hidden="true">#</a> 淘汰机制</h4><ul><li>消极方法：被访问时如果不存在再删除</li><li>积极方法：周期性地探测，发现失效就删除</li><li>主动删除：当内存超过maxmemory限定时，触发主动清理策略</li></ul><h2 id="三-实现" tabindex="-1"><a class="header-anchor" href="#三-实现" aria-hidden="true">#</a> 三. 实现</h2><h3 id="_1-redis对象分类" tabindex="-1"><a class="header-anchor" href="#_1-redis对象分类" aria-hidden="true">#</a> 1. redis对象分类</h3><ul><li>string 字符串</li><li>Hash 哈希</li><li>list 列表</li><li>set 集合</li><li>zset 有序集合</li></ul><p>Redis使用对象来表示数据库中的键和值，即每新建一个键值对，至少创建两个对象(键和值都为对象)，比如创建一个字符串</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; set name mittacy
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>name和mittacy都是一个string字符串对象</p><p>这样的好处有：</p><ol><li>redis可以在执行命令前根据对象的类型判断一个对象是否可以执行给定的命令</li><li>针对不同的使用场景，为对象设置不同的数据结构实现，从而优化对象的不同场景下的使用效率</li><li>对象系统还可以基于引用计数的内存回收机制，自动释放对象所占用的内存，或者还可以让多个键共用同一个值对象</li><li>redis对象带有访问时间记录信息，使用该信息可以进行优化空转时长较大的key，进行删除</li></ol><h4 id="object结构" tabindex="-1"><a class="header-anchor" href="#object结构" aria-hidden="true">#</a> object结构</h4><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">redisObject</span> <span class="token punctuation">{</span>
  <span class="token keyword">unsigned</span> tyoe<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">;</span>	<span class="token comment">// 类型</span>
  <span class="token keyword">unsigned</span> encoding<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">;</span>	<span class="token comment">// 编码类型</span>
  <span class="token keyword">void</span> <span class="token operator">*</span>ptr<span class="token punctuation">;</span>	<span class="token comment">// 指向底层数据的指针</span>
  ……
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-redis编码类型" tabindex="-1"><a class="header-anchor" href="#_2-redis编码类型" aria-hidden="true">#</a> 2. redis编码类型</h3><p>编码类型：</p><table><thead><tr><th>编码常量</th><th>编码对应的底层数据结构</th></tr></thead><tbody><tr><td>redis_encoding_int</td><td>long类型的整型</td></tr><tr><td>redis_encoding_embstr</td><td>embstr编码的简单动态字符串</td></tr><tr><td>redis_encoding_raw</td><td>简单动态字符串</td></tr><tr><td>redis_encoding_ht</td><td>HashTable</td></tr><tr><td>redis_encoding_linkedlist</td><td>双向链表</td></tr><tr><td>redis_encoding_ziplist</td><td>压缩列表</td></tr><tr><td>redis_encoding_intset</td><td>整数集合</td></tr><tr><td>redis_encoding_skiplist</td><td>跳跃表和字典</td></tr></tbody></table><h3 id="_3-底层结构" tabindex="-1"><a class="header-anchor" href="#_3-底层结构" aria-hidden="true">#</a> 3. 底层结构</h3><h4 id="_3-1-ziplist" tabindex="-1"><a class="header-anchor" href="#_3-1-ziplist" aria-hidden="true">#</a> 3.1 ziplist</h4><p>压缩列表是 Redis 自己设计的一种数据存储结构。它有点儿类似数组，通过一片连续的内存空间，来存储数据。不过，它跟数组不同的一点是，它允许存储的数据大小不同。具体的存储结构也非常简单</p><p><img src="https://static.mittacy.com/blog/20200921230706.jpg" alt="ziplist"></p><p>压缩列表这种存储结构，优点：</p><ul><li>一方面比较节省内存</li><li>另一方面可以支持不同类型数据的存储</li><li>而且，因为数据存储在一片连续的内存空间，通过键来获取值为列表类型的数据，读取的效率也非常高</li></ul><h4 id="_3-2-linkedlist" tabindex="-1"><a class="header-anchor" href="#_3-2-linkedlist" aria-hidden="true">#</a> 3.2 linkedlist</h4><p>Redis 的这种双向链表的实现方式，非常值得借鉴。它额外定义一个 list 结构体，来组织链表的首、尾指针，还有长度等信息。这样，在使用的时候就会非常方便。</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>// 以下是C语言代码，因为Redis是用C语言实现的。
typedef struct listnode {
  struct listNode *prev;
  struct listNode *next;
  void *value;
} listNode;

typedef struct list {
  listNode *head;
  listNode *tail;
  unsigned long len;
  // ....省略其他定义
} list;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-字典" tabindex="-1"><a class="header-anchor" href="#_3-3-字典" aria-hidden="true">#</a> 3.3 字典</h4><p>Redis 使用<code>MurmurHash2</code>这种运行速度快、随机性好的哈希算法作为哈希函数。对于哈希冲突问题，Redis 使用链表法来解决。除此之外，Redis 还支持散列表的动态扩容、缩容。</p><ul><li>当数据动态增加之后，散列表的装载因子会不停地变大。当装载因子大于 1 的时候，Redis 会触发扩容，将散列表扩大为原来大小的 2 倍左右（具体值需要计算才能得到）</li><li>当数据动态减少之后，为了节省内存，当装载因子小于 0.1 的时候，Redis 就会触发缩容，缩小为字典中数据个数的大约 2 倍大小（这个值也是计算得到的）</li></ul><p>扩容缩容要做大量的数据搬移和哈希值的重新计算，所以比较耗时。针对这个问题，Redis 使用渐进式扩容缩容策略，将数据的搬移分批进行，避免了大量数据一次性搬移导致的服务停顿。</p><h4 id="_3-4-skiplist" tabindex="-1"><a class="header-anchor" href="#_3-4-skiplist" aria-hidden="true">#</a> 3.4 skipList</h4><p>使用了zset结构，包含一个字典和一个跳跃表</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>type <span class="token keyword">struct</span> <span class="token class-name">zset</span> <span class="token punctuation">{</span>
  Zskiplist <span class="token operator">*</span>zsl<span class="token punctuation">;</span>
  dict <span class="token operator">*</span>dict<span class="token punctuation">;</span>
  ……
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-数据类型使用的结构" tabindex="-1"><a class="header-anchor" href="#_4-数据类型使用的结构" aria-hidden="true">#</a> 4. 数据类型使用的结构</h3><p>每种Object对象至少有两种不同的编码，对应关系：</p><h4 id="_4-1-string" tabindex="-1"><a class="header-anchor" href="#_4-1-string" aria-hidden="true">#</a> 4.1 String</h4><ul><li>int <code>整数值实现</code></li><li>embstr <code>sds &lt;= 39字节</code></li><li>raw <code>sds实现 &gt;= 39字节</code></li></ul><h4 id="_4-2-list" tabindex="-1"><a class="header-anchor" href="#_4-2-list" aria-hidden="true">#</a> 4.2 List</h4><ul><li>ziplist 压缩列表</li><li>linkedlist 双向列表</li></ul><p>使用ziplist条件：</p><ol><li>list对象保存的所有字符串元素长度都小于64字节</li><li>list对象保存的元素数量小于512个</li></ol><h4 id="_4-3-hash" tabindex="-1"><a class="header-anchor" href="#_4-3-hash" aria-hidden="true">#</a> 4.3 Hash</h4><ul><li>ziplist 压缩列表 <ul><li>保存同一个键值对的两个节点紧靠相邻，键key在前，值value在后</li><li>先保存的键值对在压缩列表的表头</li></ul></li><li>hashtable 哈希 <ul><li>字典的键位字符串对象，保存键key</li><li>值也为字符串对象，保存键值对的值</li></ul></li></ul><p>使用ziplist条件：</p><ol><li>list对象保存的所有字符串元素的长度都小于64字节</li><li>保存的元素数量小于512个</li></ol><p>这两个上限值是可以修改的，配置文件<code>hash-max-zaiplist-value</code>和<code>hash-max-ziplist-entries</code></p><h4 id="_4-4-set" tabindex="-1"><a class="header-anchor" href="#_4-4-set" aria-hidden="true">#</a> 4.4 Set</h4><ul><li>intset <code>使用整数集合作为底层实现，set对象包含的所有元素都被保存在intset整数集合里面</code></li><li>hashtable <code>使用散列表key存储一个set元素，而散列表value都为null</code></li></ul><p>使用intset条件：</p><ol><li>保存的所有元素都是整数值</li><li>保存的元素数量不超过512个</li></ol><h4 id="_4-5-zset" tabindex="-1"><a class="header-anchor" href="#_4-5-zset" aria-hidden="true">#</a> 4.5 Zset</h4><ul><li><p>ziplist</p><ul><li>每个集合元素使用相邻的两个压缩列表结点保存，一个保存元素成员，一个保存元素的分值，然后根据分数进行从大到小排序</li></ul></li><li><p>skiplist</p></li></ul><p>使用ziplist条件：</p><ol><li>有序集合保存的元素数量小于128个</li><li>有序集合保存的所有元素的长度都小于64字节</li></ol><p>可以通过配置文件中 <code>zset-max-ziplist-entries</code> 和 <code>zset-max-ziplist-value</code> 修改</p><h2 id="三-数据库操作" tabindex="-1"><a class="header-anchor" href="#三-数据库操作" aria-hidden="true">#</a> 三. 数据库操作</h2><ul><li>Select 切换到指定的数据库，数据库索引号 <code>index</code> 用数字值指定，以 <code>0</code> 作为起始索引值</li><li>Exists 判断key是否存在</li><li>Type 返回key的类型</li><li>Rename 重命名key，如果newName存在，则覆盖原数据</li><li>RenameNX 仅当newName不存在时才操作修改key的name为newName</li><li>Move 移动key到其他数据库</li><li>RandomKey 随机返回一个key</li><li>DBSize 返回当前数据库的key数量</li><li>Keys <ul><li><code>KEYS *</code> 匹配数据库中所有 <code>key</code></li><li><code>KEYS h?llo</code> 匹配 <code>hello</code> ， <code>hallo</code> 和 <code>hxllo</code> 等</li><li><code>KEYS h*llo</code> 匹配 <code>hllo</code> 和 <code>heeeeello</code> 等</li><li><code>KEYS h[ae]llo</code> 匹配 <code>hello</code> 和 <code>hallo</code> ，但不匹配 <code>hillo</code></li></ul></li><li>FlushDB 清空当前数据库中的所有 key</li><li>FlushAll 清空整个 Redis 服务器的数据(删除所有数据库的所有 key )</li><li>SwapDB 交换两个数据库的数据</li><li>Scan <code>SCAN cursor [MATCH pattern] [COUNT count]</code></li></ul><h2 id="四-事务" tabindex="-1"><a class="header-anchor" href="#四-事务" aria-hidden="true">#</a> 四. 事务</h2><p>事务中的多条命令被一次性发送给服务器，而不是一条一条地发送，这种方式被称为流水线，它可以减少客户端与服务器之间的网络通信次数从而提升性能</p><p>Redis 最简单的事务实现方式是使用 <code>MULTI</code> 和 <code>EXEC</code> 命令将事务操作包围起来</p><p>不同于Mysql事务，这种事务如果在中间执行遇到错误失败了，就会中断事务后续的命令就不会执行，<strong>但是前面已经执行生效的不会回滚</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> MULTI
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> 操作命令
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Redis 事务命令</strong> redis 事务的相关命令：</p><ul><li><strong>DISCARD</strong> 取消事务，放弃执行事务块内的所有命令。</li><li><strong>EXEC</strong> 执行所有事务块内的命令。</li><li><strong>MULTI</strong> 标记一个事务块的开始。</li><li><strong>UNWATCH</strong> 取消 WATCH 命令对所有 key 的监视。</li><li><strong>WATCH key [key …]</strong> 监视一个 (或多个) key ，如果在事务执行之前这个 (或这些) key 被其他命令所改动，那么事务将被打断。</li></ul><h2 id="五-持久化" tabindex="-1"><a class="header-anchor" href="#五-持久化" aria-hidden="true">#</a> 五. 持久化</h2><h3 id="_1-数据结构的持久化" tabindex="-1"><a class="header-anchor" href="#_1-数据结构的持久化" aria-hidden="true">#</a> 1. 数据结构的持久化</h3><p>Redis 的数据格式由“键”和“值”两部分组成。而“值”又支持很多数据类型，比如字符串、列表、字典、集合、有序集合。像字典、集合等类型，底层用到了散列表，散列表中有指针的概念，而指针指向的是内存中的存储地址。 那 Redis 是如何将这样一个跟具体内存地址有关的数据结构存储到磁盘中的呢？</p><p>这个问题并不特殊，很多场景中都会遇到。我们把它叫作数据结构的持久化问题，或者对象的持久化问题。这里的“持久化”，可以笼统地理解为“存储到磁盘”。</p><p>主要有两种解决思路：</p><ul><li><strong>清除原有的存储结构</strong>，只将数据存储到磁盘中。当我们需要从磁盘还原数据到内存的时候，再重新将数据组织成原来的数据结构。实际上，Redis 采用的就是这种持久化思路。这种方式也有一定的弊端。那就是数据从硬盘还原到内存的过程，会耗用比较多的时间</li><li><strong>保留原来的存储格式</strong>，将数据按照原有的格式存储在磁盘中。我们拿散列表这样的数据结构来举例。我们可以将散列表的大小、每个数据被散列到的槽的编号等信息，都保存在磁盘中。有了这些信息，我们从磁盘中将数据还原到内存中的时候，就可以避免重新计算哈希值。</li></ul><h3 id="_2-redis持久化" tabindex="-1"><a class="header-anchor" href="#_2-redis持久化" aria-hidden="true">#</a> 2. redis持久化</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 获取redis安装目录</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6379</span><span class="token operator">&gt;</span> config get dir
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;dir&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;/usr/local/var/db/redis&quot;</span>
<span class="token comment">-- 备份数据(所有数据库)，将在redis安装目录生成dump.rdb文件</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6379</span><span class="token operator">&gt;</span> <span class="token keyword">save</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6379</span><span class="token operator">&gt;</span> Bgsave	<span class="token comment">-- 在后台保存</span>
<span class="token comment">-- 恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-rdb持久化" tabindex="-1"><a class="header-anchor" href="#_2-1-rdb持久化" aria-hidden="true">#</a> 2.1 RDB持久化</h4><p>即快照式保存。Redis把数据快照存放在磁盘上的二进制文件中，文件名为dump.rdb。可以配置Redis的持久化策略，例如数据集中每N秒钟有超过M次更新，就将数据写入磁盘；或者你可以手工调用命令SAVE或BGSAVE</p><h4 id="_2-2-aof持久化" tabindex="-1"><a class="header-anchor" href="#_2-2-aof持久化" aria-hidden="true">#</a> 2.2 AOF持久化</h4><p><em>将写命令添加到 AOF 文件末尾</em> 选项同步频率：always每个写命令都同步、eyerysec每秒同步一次、no让操作系统来决定何时同步</p><ul><li>always 选项会严重减低服务器的性能</li><li>everysec 比较合适，可以保证系统崩溃时只会丢失一秒左右的数据，并且 Redis 每秒执行一次同步对服务器几乎没有任何影响</li><li>no 选项并不能给服务器性能带来多大的提升，而且会增加系统崩溃时数据丢失的数量。 随着服务器写请求的增多，AOF 文件会越来越大。Redis 提供了一种将 AOF 重写的特性，能够去除 AOF 文件中的冗余写命令</li></ul>`,107),t=[l];function p(r,o){return n(),a("div",null,t)}const d=s(i,[["render",p],["__file","index.html.vue"]]);export{d as default};
