import{_ as e,o as n,c as a,a as s}from"./app-a6a5d4a7.js";const i={},r=s(`<h3 id="_1-什么是镜像" tabindex="-1"><a class="header-anchor" href="#_1-什么是镜像" aria-hidden="true">#</a> 1. 什么是镜像</h3><ul><li><p>Docker镜像是由文件系统叠加而成，最底层是引导文件系统，即bootfs</p><ul><li>当一个容器启动时，它会被移到内存中，而引导文件会被卸载</li></ul></li><li><p>第二层是root文件系统rootfs，它位于引导文件之上</p><ul><li>root文件系统永远是只读状态，并且Docker利用<strong>联合加载技术</strong>(union mount)又会在root文件系统层上加载更多得只读文件系统</li><li>联合加载：一次同时加载多个文件系统，但是在外面看起来只能看到一个文件系统。联合加载会将各层文件系统叠加到一起，这样最终的文件系统会包含所有底层的文件和目录</li></ul><p>经过联合加载技术之后形成的文件系统，叫做镜像</p></li><li><p>一个镜像可以放到另一个镜像的顶部</p><ul><li>位于下面的镜像叫做父镜像</li><li>最底部的镜像称为<strong>基础镜像</strong></li></ul><p>当从一个镜像启动容器时，Docker会在该镜像的最顶层加载一个读写文件系统，我们想在Docker中运行的程序就是在这个读写层中执行的</p></li></ul><p><img src="https://static.mittacy.com/blog/20200419164306.jpg" alt=""></p><ul><li>当Docker第一次启动一个容器时，初始的读写层是空的。当文件系统发生变化时，这些变化会应用到这一层上(写时复制机制) <ul><li>比如修改一个文件，这个文件首先会从该读写层下面的只读层复制到该读写层，该文件的只读版本依然存在，但是已经被读写层中的该文件副本所隐藏</li></ul></li><li>写时复制机制 <ul><li>每个只读镜像层都是只读的，并且以后永远不会变化</li><li>当创建一个新容器时，Docker会<strong>构建一个镜像栈，并且在最顶端添加一个读写层</strong></li><li>读写层 + 其下面的镜像层 + 配置数据 = 容器</li></ul></li></ul><h3 id="_2-相关操作" tabindex="-1"><a class="header-anchor" href="#_2-相关操作" aria-hidden="true">#</a> 2. 相关操作</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询镜像</span>
$ <span class="token function">docker</span> images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e5021d210f6        <span class="token number">4</span> weeks ago         <span class="token number">64</span>.2MB
golang              latest              374d57ff6662        <span class="token number">4</span> weeks ago         809MB
redis               latest              f0453552d7f2        <span class="token number">5</span> weeks ago         <span class="token number">98</span>.2MB
mysql               latest              9b51d9275906        <span class="token number">6</span> weeks ago         547MB
nginx               latest              a1523e859360        <span class="token number">7</span> weeks ago         127MB
ubuntu              <span class="token number">18.04</span>               72300a873c2c        <span class="token number">8</span> weeks ago         <span class="token number">64</span>.2MB
<span class="token comment"># 查看某个仓库的镜像</span>
$ <span class="token function">docker</span> images ubuntu
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e5021d210f6        <span class="token number">4</span> weeks ago         <span class="token number">64</span>.2MB
ubuntu              <span class="token number">18.04</span>               72300a873c2c        <span class="token number">8</span> weeks ago         <span class="token number">64</span>.2MB
<span class="token comment"># 拉取镜像</span>
$ <span class="token function">docker</span> pull ubuntu:18.04
Pulling repository ubuntu
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token comment"># 查找镜像</span>
$ <span class="token function">docker</span> search ubuntu	<span class="token comment"># 该命令返回所有名字带有ubuntu的镜像</span>
<span class="token comment"># 删除镜像，只删除本地，如果已经同步到Docker Hub上需要登录Docker Hub去删除</span>
$ <span class="token function">docker</span> image <span class="token function">rm</span> <span class="token punctuation">..</span>.
$ <span class="token function">docker</span> rmi <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了区分同一仓库中的不同镜像，Docker提供了一种称为标签tag的功能，每个镜像都带有一个标签，比如ubuntu:18.04中的18.04就是标签；我们可以通过在仓库名后面加上一个冒号和标签名来指定该仓库中的某一镜像；如果不加标签，那么Docker会自动下载<strong>latest标签</strong>的镜像</p><h3 id="_3-构建镜像" tabindex="-1"><a class="header-anchor" href="#_3-构建镜像" aria-hidden="true">#</a> 3. 构建镜像</h3><h4 id="_3-1-run" tabindex="-1"><a class="header-anchor" href="#_3-1-run" aria-hidden="true">#</a> 3.1 RUN</h4><p>指定镜像构建时要运行的命令</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:18.04</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y nginx</span>
...
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-cmd" tabindex="-1"><a class="header-anchor" href="#_3-2-cmd" aria-hidden="true">#</a> 3.2 CMD</h4><p>指定容器被启动时要运行的命令，在Dockerfile中只能有一条CMD指令，如果有多条，则最后一条CMD指令会被使用</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:18.04</span>
...
...
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;/bin/bash&quot;</span>(, [<span class="token string">&quot;参数&quot;</span>])]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>切记：<code>$ docker run命令可以覆盖CMD指令 </code></strong></p><p>如果我们在Dockerfile里指定了CMD指令，而同时在docker run命令行中也指定了要运行的命令，命令行中指定的命令会覆盖Dockerfile中的CMD指令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> ubuntu:18.04 /bin/ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>/bin/ps</code>命令将覆盖Dockerfile文件中的CMD指令</p><h4 id="_3-3-entrypoint" tabindex="-1"><a class="header-anchor" href="#_3-3-entrypoint" aria-hidden="true">#</a> 3.3 ENTRYPOINT</h4><p>实际上，docker run 命令行中指定的任何参数都会被当做参数，再次传递给 entrypoint指令 中指定的命令</p><p>entrypoint和cmd搭配可以实现类似 函数默认参数 的实现</p><p>Dockerfile文件：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>...
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/usr/sbin/nginx&quot;</span>]</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;-h&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动容器命令：</p><ul><li><p><code>$ docker run -t -i mittacy/static_web -g &quot;daemon off;&quot;</code></p><p>则<code>-g &quot;daemon off;&quot;</code>会覆盖CMD [&quot;-h&quot;]传递给EntryPoint指令，最终执行：</p><p><code>/usr/sbin/nginx -g daemon off;</code></p></li><li><p><code>$ docker run -t -i mittacy/static_web</code></p></li></ul><p>没有传递参数。，则使用CMD指令，最终执行：</p><p><code>/usr/sbin/nginx -h</code></p><p>如果想要覆盖EntryPoint，可以：</p><p><code>$ docker run --entrypoint=&quot;&quot;</code></p><h4 id="_3-4-workdir" tabindex="-1"><a class="header-anchor" href="#_3-4-workdir" aria-hidden="true">#</a> 3.4 WORKDIR</h4><p>WorkDir指令 用来在从镜像创建一个新容器时，在容器内部设置一个工作目录</p><p>EntryPoint和/或CMD指定的程序会在这个目录下执行</p><p>新建容器时，可以使用<code>-w</code>来覆盖工作目录</p><h4 id="_3-5-env" tabindex="-1"><a class="header-anchor" href="#_3-5-env" aria-hidden="true">#</a> 3.5 ENV</h4><p>在镜像构建过程中设置环境变量</p><h4 id="_3-6-user" tabindex="-1"><a class="header-anchor" href="#_3-6-user" aria-hidden="true">#</a> 3.6 USER</h4><p>该镜像会以什么样的用户去运行</p><p>如果不通过USER指令指定用户，默认用户为 root</p><h4 id="_3-7-volume" tabindex="-1"><a class="header-anchor" href="#_3-7-volume" aria-hidden="true">#</a> 3.7 VOLUME</h4><p>用来想基于镜像创建的容器添加卷，一个卷可以存在于一个或者多个容器内的特点的目录，这个目录可以绕过联合文件系统，并提供如下共享数据或者对数据进行持久化的功能</p><ul><li>卷可以在容器间共享和重用</li><li>对卷的修改是立即生效的</li><li>对卷的修改不会对更新镜像产生影响</li><li>卷会一直存在直到没有任何容器再使用它</li></ul><p>可以指定多个卷</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>VOLUME [&quot;/opt/project&quot;, &quot;/data&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-8-add" tabindex="-1"><a class="header-anchor" href="#_3-8-add" aria-hidden="true">#</a> 3.8 ADD</h4><p>用来将构建环境下的文件和目录复制到镜像中</p><ul><li>如果目的地址以 / 结尾，那么Docker就认为源位置指向的是一个目录</li><li>不是以 / 结尾，那么Docker就认为源位置指向的是文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ADD latest.tar.gz /var/www/wordpress
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果源位置指向的文件是压缩文件，这条命令会将归档文件 latest.tar.gz 解开到 /var/www/wordpress/ 目录下，Docker 解开归档文件的行为和使用带-x 选项的 tar命令 一样</p><p>如果目的位置不存在的话，Docker 会创建这个全路径，新创建的文件和目录的模式为0755(- rwx r-x r-x)</p><p><strong>ADD指令会使得构建缓存变得无效</strong></p><h4 id="_3-9-copy" tabindex="-1"><a class="header-anchor" href="#_3-9-copy" aria-hidden="true">#</a> 3.9 COPY</h4><p>COPY 和 ADD区别：</p><ul><li>Copy 只复制，不会管文件提取、解压</li><li>文件源路径必须是一个与当前构建环境相对的文件或者目录，本地文件都放到和Dockerfile同一目录下</li><li>目的位置必须是容器内部的一个绝对路径</li></ul><h4 id="_3-10-label" tabindex="-1"><a class="header-anchor" href="#_3-10-label" aria-hidden="true">#</a> 3.10 LABEL</h4><h4 id="_3-11-stopsignal" tabindex="-1"><a class="header-anchor" href="#_3-11-stopsignal" aria-hidden="true">#</a> 3.11 STOPSIGNAL</h4><h4 id="_3-12-arg" tabindex="-1"><a class="header-anchor" href="#_3-12-arg" aria-hidden="true">#</a> 3.12 ARG</h4><h4 id="_3-13-onbuild" tabindex="-1"><a class="header-anchor" href="#_3-13-onbuild" aria-hidden="true">#</a> 3.13 ONBUILD</h4><h3 id="_4-推送镜像到docker-hub" tabindex="-1"><a class="header-anchor" href="#_4-推送镜像到docker-hub" aria-hidden="true">#</a> 4. 推送镜像到Docker Hub</h3><p>通过<code>docker push</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> push mittacy/image_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-自动构建" tabindex="-1"><a class="header-anchor" href="#_5-自动构建" aria-hidden="true">#</a> 5. 自动构建</h3><p>​ 为了使用自动构建，只需要将 Github 或 BitBucket 中含有 Dockerfile 文件的仓库连接到 Docker Hub即可。添加完成后，以后每次向这个代码仓库推送代码时，将会出发一次镜像构建活动并创建一个新镜像</p><p>① 将Github 账号连接到Docker Hub</p><p>② 选择用来进行自动构建的仓库</p><p>③ 配置信息，点击 Create Repository 完成连接</p><p>单击 Build Status 可以查看最近一次构建的状态，包括标椎输出的日志，记录了构建过程已经任何的错误。</p><p>如果状态为Done，则表示自动构建为最新状态；Error 表示构建过程出现错误</p><p><strong>不能通过 docker push 命令推送一个自动构建，只能通过更新GitHub / BitBucket仓库来更新自动构建</strong></p>`,68),d=[r];function t(l,o){return n(),a("div",null,d)}const u=e(i,[["render",t],["__file","index.html.vue"]]);export{u as default};
