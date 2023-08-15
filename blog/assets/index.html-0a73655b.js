import{_ as e,o as i,c as t,a as n}from"./app-c399b13a.js";const s={},l=n(`<p>Mysql时间类型有以下：</p><table><thead><tr><th>类型名称</th><th>日期格式</th><th>日期范围</th><th>存储需求</th></tr></thead><tbody><tr><td>YEAR</td><td>YYYY</td><td>1901 ~ 2155</td><td>1 个字节</td></tr><tr><td>TIME</td><td>HH:MM:SS</td><td>-838:59:59 ~ 838:59:59</td><td>3 个字节</td></tr><tr><td>DATE</td><td>YYYY-MM-DD</td><td>1000-01-01 ~ 9999-12-3</td><td>3 个字节</td></tr><tr><td>DATETIME</td><td>YYYY-MM-DD HH:MM:SS</td><td>1000-01-01 00:00:00 ~ 9999-12-31 23:59:59</td><td>8 个字节</td></tr><tr><td>TIMESTAMP</td><td>YYYY-MM-DD HH:MM:SS</td><td>1970-01-01 00:00:01 UTC ~ 2038年1月19日03:14:07 UTC</td><td>4 个字节</td></tr></tbody></table><p>我们这里展开学习DATETIME、TIMESTAMP</p><h3 id="timestamp" tabindex="-1"><a class="header-anchor" href="#timestamp" aria-hidden="true">#</a> timestamp</h3><p>存储的内容为 &#39;1970-01-01 00:00:00&#39; 到现在所经历的秒数，由于timestamp只占用4个字节，时间上限只能到 &#39;2038-01-19 03:14:07&#39;</p><p>从Mysql5.6.4版本开始也能支持毫秒，数据类型定义为timestamp(N)，N取值范围为0-6</p><p>默认为0，如需要精确到毫秒则设置为Timestamp(3)，如需要精确到微秒则设置为timestamp(6)</p><h3 id="datetime" tabindex="-1"><a class="header-anchor" href="#datetime" aria-hidden="true">#</a> DATETIME</h3><p>DATETIME从Mysql5.6.4版本开始需要5个字节</p><ul><li>前3个字节分别存储年、月、日</li><li>第4个字节的高4位存储小时数，低4位存储分钟数</li><li>第5个字节的高4为存储秒数，低4位存储毫秒数</li></ul><blockquote><p>在Mysql5.6.4版本之前，固定占用8个字节，前4个字节存储日期，后4个字节存储时间；</p></blockquote><h3 id="时区相关性" tabindex="-1"><a class="header-anchor" href="#时区相关性" aria-hidden="true">#</a> 时区相关性</h3><p>从timestamp、datetime的低层存储可以知道</p><ul><li><p>timestamp存储的是1970-01-01至某一个时间点的毫秒数，会因为mysql的时区变化而读取不同的时间；</p></li><li><p>而datetime只存储了日期时间，与mysql时区无关，但与写入mysql时客户端的时区有关。</p><p>比如当mysql服务端设置了<strong>北京时区</strong>、然后使用golang gorm时如果没有进行时区设置（<strong>默认为utc</strong>）进行时间写入的话，会发现落库到mysql的时间比我们实际赋值的时间晚了8个小时，这是由于gorm认为自己所在时区为utc，而go的time.Time时区如果设置了本地则为北京时间，所以gorm会将时间转化为utc时区也就是-8个小时再执行了insert操作</p><blockquote><p>utc比北京时间时间晚8个小时</p></blockquote></li></ul><p>建一个表来测试下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table test_time
(
    id bigint auto_increment
        primary key,
    t1 datetime not null,
    t2 timestamp not null
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置时区为北京东八区，然后插入两条数据，一条指定时间，一条使用当前时间</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>set global time_zone = &#39;+08:00&#39;;
set time_zone = &#39;+08:00&#39;;
select @@global.time_zone; -- +08:00

SET @now_str = now();	-- 2023-06-10 19:06:57
insert into test_time (t1, t2) values (@now_str, @now_str), (now(), now());
select * from test_time;
+----+---------------------+---------------------+
| id | dt_col              | ts_col              |
+----+---------------------+---------------------+
|  1 | 2023-06-10 19:06:57 | 2023-06-10 19:06:57 |
|  2 | 2023-06-10 19:06:57 | 2023-06-10 19:06:57 |
+----+---------------------+---------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这个时候修改mysql时区为UTC，会发现timestamp发生相应的转化，而datetime不会变化</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>set global time_zone = &#39;+0:00&#39;;
set time_zone = &#39;+0:00&#39;;
select * from test_time;
+----+---------------------+---------------------+
| id | dt_col              | ts_col              |
+----+---------------------+---------------------+
|  1 | 2023-06-10 19:06:57 | 2023-06-10 11:06:57 |
|  2 | 2023-06-10 19:06:57 | 2023-06-10 11:06:57 |
+----+---------------------+---------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还需要注意的是，当我们在程序端连接mysql写入时间数据时，需要注意配置时区，比如使用gorm连接MySQL时</p><p>服务端时间默认为本地时区(我是东八区)，而gorm没有配置时将默认为utc，utc比东八区晚了8个小时，所以当我写入mysql时时间将比预期的晚了8个小时，需要在连接mysql时配置时区：loc=Local</p><h3 id="timestamp性能问题" tabindex="-1"><a class="header-anchor" href="#timestamp性能问题" aria-hidden="true">#</a> timestamp性能问题</h3><p>虽然从毫秒数转换到类型timestamp本身需要的CPU指令并不多，但是如果使用默认的操作系统时区，则每次通过时区计算时间，需要调用操作系统底层函数“__tz_convert()”，而这个函数需要额外的加锁操作以确保操作系统时区没有修改，所以建议直接配置mysql时区为对应的时区而不是SYSTEM：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
time_zone = &quot;+08:00&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储时间的最佳实践" tabindex="-1"><a class="header-anchor" href="#存储时间的最佳实践" aria-hidden="true">#</a> 存储时间的最佳实践</h3><p>由于需要记录详细的时间，所以一般采用 timestamp、datetime、int类型</p><ul><li><p>如果需要毫秒级，如果使用的Mysql版本在5.6.4之前，不支持毫秒级时间，那么没有选择，只能采用 uint类型存储时间戳，在存储/查询的时候进行相应的转化</p></li><li><p>当前为2023年，距离timestamp最大存储时间2038年并不远，如果不考虑时间范围，那么首选timestamp，当然得注意Mysql的时区配置发生变化时，timestamp数据将发生对应的转化</p></li><li><p>如果不需要考虑时区以及需要长久的时间范围，那么采用datetime，将Mysql服务端以及程序设置一致的时区，读写都不需要考虑时区问题，查库可读写也好，同时没有时区转化性能也更好</p></li><li><p>如果既需要在多个时区读数据、且需要很长的时间范围，那么有两种做法：</p><ul><li><p>使用uint存储，牺牲运维可读性，其他操作、性能都很友好</p></li><li><p>使用datetime，将mysql设置为utc时区，各个服务端读取数据后将时间进行转化为服务端时区。该方案会导致非utc时区的运维人员查看mysql数据时看时间数据有点奇怪，会早/晚几个小时</p><p>比如golang gorm的处理：</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>func main() {
    var err error
	// mysql采用utc时区
	dsn := &quot;root:password@tcp(127.0.0.1:3306)/local_test?charset=utf8mb4&amp;parseTime=True&amp;loc=utc&quot;
	mysqlConn, err = gorm.Open(mysql.Open(dsn), &amp;gorm.Config{})
	if err != nil {
		panic(err)
	}

	// 读取后转化为本地时区
	res := map[string]interface{}{}
	var times struct {
		ID int64
		T1 time.Time
	}
	if err := mysqlConn.Debug().Table(&quot;test_time&quot;).Find(&amp;times).Error; err != nil {
		panic(err)
	}
	
	res[&quot;t1&quot;] = times.T1
	// 转化为本地时区
	t1 := times.T1.In(time.Local)
	res[&quot;t2&quot;] = t1
	fmt.Println(res)
}

// 输出
t1:2023-06-10 11:50:09 +0000 UTC 
t2:2023-06-10 19:50:09 +0800 CST 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><p>各个方案都有对应的优缺点，需要根据业务需要进行相应的取舍，个人更喜欢将时间存储数字型，返回给前端时间戳即可，这样如何展示时间、展示什么时区由前端自行处理</p>`,29),d=[l];function a(r,m){return i(),t("div",null,d)}const v=e(s,[["render",a],["__file","index.html.vue"]]);export{v as default};
