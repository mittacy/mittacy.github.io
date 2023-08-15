import{_ as t,o as d,c as e,a}from"./app-a6a5d4a7.js";const r={},i=a('<h3 id="_1-记录父类" tabindex="-1"><a class="header-anchor" href="#_1-记录父类" aria-hidden="true">#</a> 1. 记录父类</h3><h4 id="存储结构" tabindex="-1"><a class="header-anchor" href="#存储结构" aria-hidden="true">#</a> 存储结构</h4><table><thead><tr><th>id</th><th>name</th><th>parent</th></tr></thead><tbody><tr><td>1</td><td>文具</td><td>0</td></tr><tr><td>2</td><td>笔</td><td>1</td></tr><tr><td>3</td><td>铅笔</td><td>2</td></tr><tr><td>4</td><td>钢笔</td><td>2</td></tr></tbody></table><p>文具包含了笔，笔包含了铅笔和钢笔。这种方案简单易懂，仅存在一张表，并且没有冗余字段，存储空间占用极小，在数据库层面是一种很好的设计。</p><h4 id="数据操作" tabindex="-1"><a class="header-anchor" href="#数据操作" aria-hidden="true">#</a> 数据操作</h4><ul><li><p>移动：修改父节点id即可，子节点跟随该节点到新的位置</p></li><li><p>删：删除节点，需要同时删除节点下的所有子节点</p></li><li><p>查：</p><ul><li><p>查询文具的所有下一层分类</p><p><code>select id, name from table where parent = 1;</code></p></li><li><p>查询文具的所有下层分类，先查出直属下级（笔），才能够往下查询，这意味着需要递归</p></li></ul></li></ul><h4 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h4><ul><li>优点：结构简单，增删改快</li><li>缺点：查询所有下级慢</li></ul><h3 id="_2-路径列表" tabindex="-1"><a class="header-anchor" href="#_2-路径列表" aria-hidden="true">#</a> 2. 路径列表</h3><h4 id="存储结构-1" tabindex="-1"><a class="header-anchor" href="#存储结构-1" aria-hidden="true">#</a> 存储结构</h4><p>在第一种方法 <strong>记录父类</strong> 中仅仅存储了直属父类，而需求却要查询出非直属下级。针对这一点，我们的表中不仅仅记录父节点id，而是将它到顶级分类之间所有分类的id都保存下来。这个字段所保存的信息就像文件树里的路径一样，所以就叫做path</p><table><thead><tr><th>id</th><th>name</th><th>path</th></tr></thead><tbody><tr><td>1</td><td>文具</td><td></td></tr><tr><td>2</td><td>笔</td><td>1</td></tr><tr><td>3</td><td>铅笔</td><td>1,2</td></tr><tr><td>4</td><td>钢笔</td><td>1,2</td></tr><tr><td>6</td><td>其他</td><td></td></tr></tbody></table><h4 id="数据操作-1" tabindex="-1"><a class="header-anchor" href="#数据操作-1" aria-hidden="true">#</a> 数据操作</h4><ul><li><p>增：path为父类的<code>path</code>加上父类的id</p><p>比如在笔中添加圆珠笔：<code>insert into table (name, path) values (圆珠笔, &#39;1,2&#39;);</code></p></li><li><p>移动：将分类及其所有子分类的<code>path</code>设为其父类的<code>path</code>并在最后追加父类的id</p><p>比如将<code>笔</code>移动到<code>其他</code>，需要将笔、铅笔、钢笔的path中的1都依次修改为6</p><p>如果使用mysql来操作较为复杂，建议先查询，在业务层进行修改，再更新</p></li><li><p>删：使用模糊查询匹配所有子类并删除</p></li><li><p>查：</p><ul><li><p>查询笔的所有下一层分类</p><p><code>select * from table where path = &#39;1,2&#39;;</code></p></li><li><p>查询文具的所有下层分类</p><p><code>select * from table where path like &#39;1,%&#39;;</code></p></li></ul></li></ul><h4 id="优缺点-1" tabindex="-1"><a class="header-anchor" href="#优缺点-1" aria-hidden="true">#</a> 优缺点</h4><ul><li>优点：增删改慢，只要在path建立索引查询很快，模糊查询可以用到path索引</li><li>缺点 <ul><li>不遵守数据库范式，将列表数据直接作为字符串来存储</li><li>字段长度是有限的，不能真正达到无限级深度，当然一般业务会进行层数限制，这个问题一般不影响</li></ul></li></ul><h3 id="_3-闭包表" tabindex="-1"><a class="header-anchor" href="#_3-闭包表" aria-hidden="true">#</a> 3. 闭包表</h3><h4 id="存储结构-2" tabindex="-1"><a class="header-anchor" href="#存储结构-2" aria-hidden="true">#</a> 存储结构</h4><p>除了分类表以外，新建一张表来记录分类直接的层级关系</p><table><thead><tr><th>id</th><th>name</th></tr></thead><tbody><tr><td>1</td><td>文具</td></tr><tr><td>2</td><td>笔</td></tr><tr><td>3</td><td>铅笔</td></tr><tr><td>4</td><td>钢笔</td></tr></tbody></table><ul><li>ancestor：父节点</li><li>descendant：子节点</li><li>distance：距离</li></ul><table><thead><tr><th>ancestor</th><th>descendant</th><th>distance</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>1</td></tr><tr><td>1</td><td>3</td><td>2</td></tr><tr><td>1</td><td>4</td><td>2</td></tr><tr><td>2</td><td>3</td><td>1</td></tr><tr><td>2</td><td>4</td><td>1</td></tr></tbody></table><h4 id="数据操作-2" tabindex="-1"><a class="header-anchor" href="#数据操作-2" aria-hidden="true">#</a> 数据操作</h4><ul><li>移动：较为麻烦，涉及到相关节点的distance增减</li><li>删：删除所有相关节点即可</li><li>查：两边连接查询</li></ul><h4 id="优缺点-2" tabindex="-1"><a class="header-anchor" href="#优缺点-2" aria-hidden="true">#</a> 优缺点</h4><ul><li>优点：可以支持更多的操作，比如查询某个层的所有节点，而且查询速度较快</li><li>缺点：特别非空间，增删改麻烦</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>需要注意的是像目录这样的结构，是很少改动的，所以很适合利用redis来缓存加快访问速度，虽然 <code>闭包法</code> 支持更多的操作，但较为复杂且数据冗余太严重，个人更倾向于选择 <code>记录父类法</code> 和 <code>路劲列表法</code> 配合 redis 缓存使用，缓存整个结构，查询时直接返回给业务，进行更多的取舍即可。</p>',28),h=[i];function l(c,n){return d(),e("div",null,h)}const p=t(r,[["render",l],["__file","index.html.vue"]]);export{p as default};
