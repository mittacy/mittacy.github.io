import{_ as o,o as e,c as l,a as d}from"./app-c399b13a.js";const c={},i=d('<p>Mysql共有六种日志：</p><ul><li>redo log</li><li>undo log</li><li>binlog</li><li>errlog</li><li>slow query log</li><li>general log</li><li>relay log</li></ul><h3 id="_1-redo-log" tabindex="-1"><a class="header-anchor" href="#_1-redo-log" aria-hidden="true">#</a> 1. redo log</h3><p>redo log是物理日志，InnoDB特有，包含两部分：</p><ul><li><code>redo log buffer</code> : 内存中的日志缓存</li><li><code>redo log file</code>：磁盘上的重做日志文件</li></ul><p>redo log 是物理日志，记录的是“在<strong>某个数据页</strong>上做了什么修改”</p><p>事务的每个操作都会记录到<code>redo log buffer</code>中，而什么时候更新到<code>redo log file</code> 由参数 <code>innodb_flush_log_at_trx_commit</code> 决定</p><ul><li>1 每次commit都会把redo log从<code>redo log buffer</code>写入到<code>os buffer</code>，如果不是只读操作，即涉及到数据修改，则调用<code>fsync()</code>刷新到磁盘文件<code>redo log file</code>中</li><li>2 每次commit都写入到<code>os buffer</code>，但是每秒才调用<code>fsync()</code>刷新到<code>redo log file</code></li><li>0 每秒写入到 <code>os buffer</code>并刷新到<code>redo log file</code></li></ul><h4 id="_1-1-redo-log文件" tabindex="-1"><a class="header-anchor" href="#_1-1-redo-log文件" aria-hidden="true">#</a> 1.1 redo log文件</h4><p>redo log file 可以有多个文件，由参数<code>innodb_log_files_in_group</code>决定，它们的大小完全一致，将<code>os buffer</code>刷新到这些<code>redo log file</code>中是循环写入的，从第一个文件开始写，写满了从第二个文件继续写，全满了就从第一个文件从头开始覆盖写，当然，覆盖前得确保这些数据更新到这些操作对应的数据中</p><h4 id="_1-2-日志刷盘规则" tabindex="-1"><a class="header-anchor" href="#_1-2-日志刷盘规则" aria-hidden="true">#</a> 1.2 日志刷盘规则</h4><p><code>redo log buffer</code>中未保存到磁盘的的日志称为<code>dirty log</code></p><p>刷日志到磁盘有以下几种触发规则：</p><ul><li>上面已经提到的，事务<code>commit</code>动作是否提交由<code>innodb_flush_log_at_trx_commit</code>决定</li><li>每秒刷一次。由<code>innodb_flush_log_at_timeout</code>决定，默认1秒，注意与<code>commit动作无关</code></li><li><code>当redo log buffer</code>中已经使用的内存超过一半</li><li>当有<code>checkpoint</code>时</li></ul><h4 id="_1-3-数据页刷盘" tabindex="-1"><a class="header-anchor" href="#_1-3-数据页刷盘" aria-hidden="true">#</a> 1.3 数据页刷盘</h4><p>同样的，内存中（<code>buffer pool</code>）未刷到磁盘的数据称为脏数据（<code>dirty data</code>），注意，虽然修改记录已经记录到<code>redo log file</code>中，但是并未更新到真正的数据中，所以内存和磁盘中的数据是不一致的。</p><p>触发数据页刷盘的规则只有一个：<code>checkpoint</code>。但是触发<code>checkpoint</code>的情况却有几种。不管怎样，<code>checkpoint</code>触发后，会将<code>buffer</code>中脏日志页都刷到磁盘，脏数据页部分或全部刷到数据</p><p>InnoDB 存储引擎中<code>checkpoint</code>分为两种：</p><ul><li><code>share checkpoint</code>：在重用<code>redo log</code>文件（例如切换日志文件）的时候，将所有已记录到<code>redo log</code>中对应的脏数据刷到磁盘</li><li><code>fuzzy checkpoint</code>：一次只刷一小部分的日志到磁盘，而非将所有脏日志刷盘 <ul><li><code>master thread checkpoint</code>：由<code>master</code>线程控制，每秒或每 10 秒刷入一定比例的脏页到磁盘</li><li><code>flush_lru_list checkpoint</code>：从 MySQL5.6 开始可通过<code>innodb_page_cleaners</code>变量指定专门负责脏页刷盘的<code>page cleaner</code>线程的个数，该线程的目的是为了保证<code>lru</code>列表有可用的空闲页</li><li><code>async/sync flush checkpoint</code>：同步刷盘还是异步刷盘</li><li><code>dirty page too much checkpoint</code>：脏页太多时强制触发检查点，目的是为了保证缓存有足够的空闲空间。<code>too much</code>的比例由变量<code>innodb_max_dirty_pages_pct</code>控制，MySQL 5.6 默认的值为 75，即当脏页占缓冲池的 75% 后，就强制刷一部分脏页到磁盘。</li></ul></li></ul><h3 id="_2-binlog" tabindex="-1"><a class="header-anchor" href="#_2-binlog" aria-hidden="true">#</a> 2. binlog</h3><p>binlog是逻辑日志，在Server层实现的，追加写入文件，所有存储引擎都能使用，记录的是这个这个语句的原始逻辑。</p><p>主要用于归档、主从同步等。</p><p>格式：</p><ul><li><p>statement</p><p>记录的是sql原句，如果主备库进行同步可能出现不一致：</p><p><code>delete from t where a&gt;=4 and t_modified&lt;=&#39;2018-11-10&#39; limit 1;</code></p><p>如果主库使用索引a进行查找，删除了一行记为 ROW1；</p><p>记录到binlog，备库执行该语句不一定使用a索引，可能使用t_modified索引，找到的第一行不一定是ROW1这一行，可能会删除其他行导致主备不一致</p></li><li><p>row</p><p>row格式会记录行的内容，记两条，更新前和更新后都有。row 格式的缺点是很占空间。如果删除10万行数据，用 statement 只需要记录一个SQL语句；用 row 要把这10万条记录都写到binlog中，不仅占用更大的空间，同时写 binlog 也要耗费IO资源，影响执行速度</p></li><li><p>mixed</p><p>使用 mixed 格式的binlog，Mysql 会判断 SQL语句是否可能引起主备不一致，如果有可能，就用row格式，否则用 statement格式</p></li></ul><h3 id="_3-undo-log" tabindex="-1"><a class="header-anchor" href="#_3-undo-log" aria-hidden="true">#</a> 3. undo log</h3><ul><li>回滚日志用于事务确保原子性，事务的每个操作都会记录逆向逻辑操作，当执行rollback时，可以执行<code>undo log</code>实现回到起点</li><li>同时<code>undo log</code>也是实现MVCC的基础</li></ul><p>系统会判断当没有事务需要用到这些回滚日志的时候，回滚日志会被删除。</p><h3 id="_3-两阶段提交" tabindex="-1"><a class="header-anchor" href="#_3-两阶段提交" aria-hidden="true">#</a> 3. 两阶段提交</h3><p>比如执行：<code>mysql&gt; update T set c=c+1 where ID=2;</code></p><ol><li>执行器先找引擎取 ID=2 这一行。ID 是主键，引擎直接用树搜索找到这一行。如果 ID=2 这一行所在的数据页本来就在内存中，就直接返回给执行器；否则，需要先从磁盘读入内存，然后再返回。</li><li>执行器拿到引擎给的行数据，把这个值加上 1，比如原来是 N，现在就是 N+1，得到新的一行数据，再调用引擎接口写入这行新数据。</li><li>引擎将这行新数据更新到内存中，同时将这个更新操作记录到 redo log 里面，此时 redo log 处于 prepare 状态。然后告知执行器执行完成了，随时可以提交事务</li><li>执行器生成这个操作的 binlog，并把 binlog 写入磁盘。</li><li>执行器调用引擎的提交事务接口，引擎把刚刚写入的 redo log 改成提交（commit）状态，更新完成。</li></ol><p>两阶段提交是为了让两份日志之间的逻辑一致。</p><h3 id="总结问题" tabindex="-1"><a class="header-anchor" href="#总结问题" aria-hidden="true">#</a> 总结问题</h3><ol><li><p>redo log 和 bin log区别</p><p>binlog主要用于归档，它不知道哪些操作已经刷新到磁盘数据中了，如果DB异常重启，不能恢复内存中未更新到磁盘的数据</p><p>而redo log日志则记录了未刷新数据的操作位置，如果异常重启，重启之后，可以使用redo log日志恢复数据，也就是拥有 crash-safe 能力</p></li></ol><hr><p>参考文章：</p><ol><li>https://time.geekbang.org/column/intro/139</li><li>https://www.cnblogs.com/wy123/p/8365234.html</li><li>https://www.cnblogs.com/xinysu/p/6555082.html#_lab2_1_0</li><li>https://blog.csdn.net/qq_35246620/article/details/79345359</li></ol>',36),r=[i];function a(t,n){return e(),l("div",null,r)}const h=o(c,[["render",a],["__file","index.html.vue"]]);export{h as default};