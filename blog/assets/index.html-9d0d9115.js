import{_ as a,o as n,c as s,a as e}from"./app-a6a5d4a7.js";const i={},l=e(`<h3 id="_1-运行一个ubuntu" tabindex="-1"><a class="header-anchor" href="#_1-运行一个ubuntu" aria-hidden="true">#</a> 1. 运行一个ubuntu</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> ubuntu:18.04 /bin/bash
……
……
root@d823d5acadcc:/<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析这个命令：</p><ul><li>-i 保证容器中 STDIN 是开启的，尽管我们并没有附着到容器</li><li>-t 告诉Docker为要创建的容器分配一个为 tty 终端，这样新创建的容器才能提供一个交互式的shell</li><li>ubuntu:18.04 告诉Docker基于什么镜像来创建容器，实例中使用的是ubuntu:18.04镜像(省略18.04则默认使用last版本)</li><li>/bin/bash 这句是运行容器后，在新容器要运行的命令</li></ul><p>解析这个过程：</p><ol><li>Docker检查本地是否存在ubuntu:18.04镜像，如果本地还没有该镜像的话，那么Docker就会连接Docker Hub Registry，查看 Docker Hub中是否有该镜像。Docker一旦找到该镜像，就会下载该镜像并保存其到本地宿主机中</li><li>随后，使用这个镜像创建了一个新容器，该容器有自己的网络、IP地址，以及一个用来和宿主进行通信的桥接网络接口。</li><li>最后我们告诉Docker在新容器中要运行什么命令，例子中的<code>/bin/bash</code>命令启动了一个Bash shell</li></ol><p>现在，我们以root用户登录到了新容器中，容器的Id为：d823d5acadcc，这是一个完整的Ubuntu系统，可以用它来做任何事情</p><h3 id="_2-容器命名" tabindex="-1"><a class="header-anchor" href="#_2-容器命名" aria-hidden="true">#</a> 2. 容器命名</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> container <span class="token function">ls</span> <span class="token parameter variable">-a</span>
CONTAINER ID   IMAGE          COMMAND    CREATED      STATUS       PORTS        NAMES
c345d5sasdfkj  ubuntu:18.04  <span class="token string">&quot;/bin/bash&quot;</span> <span class="token number">4</span> hours ago  Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">5</span> seconds ago  gray_cat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想为容器指定一个名称，而不是使用自动生成的名称，则可以用--name标志来实现</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> container <span class="token function">rm</span> gray_cat
$ <span class="token function">docker</span> run <span class="token parameter variable">--name</span> linux <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> ubuntu:18.04 /bin/bash
root@d823d5acadcc: <span class="token builtin class-name">exit</span>
$ <span class="token function">docker</span> container <span class="token function">ls</span> <span class="token parameter variable">-a</span>
CONTAINER ID   IMAGE          COMMAND    CREATED      STATUS       PORTS        NAMES
d823d5acadcc  ubuntu:18.04  <span class="token string">&quot;/bin/bash&quot;</span> <span class="token number">4</span> hours ago  Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">5</span> seconds ago    linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-定位容器" tabindex="-1"><a class="header-anchor" href="#_3-定位容器" aria-hidden="true">#</a> 3. 定位容器</h3><p>有三种方法可以唯一指代容器：</p><ul><li>短UUID，如：d823d5acadcc</li><li>长UUID</li><li>名称</li></ul><p><strong>容器的命名必须是唯一的</strong></p><h3 id="_4-重新启动已经启动的容器" tabindex="-1"><a class="header-anchor" href="#_4-重新启动已经启动的容器" aria-hidden="true">#</a> 4. 重新启动已经启动的容器</h3><p>启动使用：docker start name</p><p>附着：docker attach name</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重新启动</span>
$ <span class="token function">docker</span> start linux
<span class="token comment"># linux运行在后台</span>
$ <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
d823d5acadcc        ubuntu:18.04        <span class="token string">&quot;/bin/bash&quot;</span>         <span class="token number">4</span> hours ago         Up <span class="token number">4</span> seconds                            linux
<span class="token comment"># 进入容器内</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> linux /bin/bash
root@d823d5acadcc:/<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果推出容器的shell，容器会再次停止运行</p><h3 id="_5-创建守护式容器" tabindex="-1"><a class="header-anchor" href="#_5-创建守护式容器" aria-hidden="true">#</a> 5. 创建守护式容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">--name</span> daemon_linux <span class="token parameter variable">-d</span> ubuntu:18.04 /bin/sh <span class="token parameter variable">-c</span> <span class="token string">&quot;while true; do echo hello world; sleep 1; done&quot;</span>
5ddff43da9675fe673a010c0df380418cf586b1836711383b38b2c5d5f6fbeb9 <span class="token comment"># 返回了容器的id</span>
$ <span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用参数 <code>-d</code>，因此Docker会将容器放到后台运行</p><h3 id="_6-查看容器内部在干什么" tabindex="-1"><a class="header-anchor" href="#_6-查看容器内部在干什么" aria-hidden="true">#</a> 6. 查看容器内部在干什么</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取容器日志</span>
$ <span class="token function">docker</span> logs daemon_linux
<span class="token comment"># -f参数 监控容器日志</span>
$ <span class="token function">docker</span> logs <span class="token parameter variable">-f</span> daemon_linux	<span class="token comment"># ctrl+c退出</span>
<span class="token comment"># -t参数 加上时间戳</span>
$ <span class="token function">docker</span> logs <span class="token parameter variable">-t</span> <span class="token parameter variable">-f</span> daemon_linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-日志驱动" tabindex="-1"><a class="header-anchor" href="#_7-日志驱动" aria-hidden="true">#</a> 7. 日志驱动</h3><p><code>--log-driver=“syslog”</code></p><ul><li>json-file，为docker logs命令提供了基础</li><li>syslog，该命令将禁用docker logs命令，并且将所有容器的日志输出都重定向到Syslog</li><li>可以在启动Docker守护进程时指定该选项，将所有容器的日志都输出重定向到Syslog</li><li>或者通过docker run对个别的容器进行日志重定向</li><li>none，会禁用所有容器中的日志，docker logs也禁用</li></ul><h3 id="_8-查看容器内的进程" tabindex="-1"><a class="header-anchor" href="#_8-查看容器内的进程" aria-hidden="true">#</a> 8. 查看容器内的进程</h3><p>使用docker top命令</p><p><code>docker top name</code></p><h3 id="_9-停止守护式进程" tabindex="-1"><a class="header-anchor" href="#_9-停止守护式进程" aria-hidden="true">#</a> 9. 停止守护式进程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> stop name
<span class="token comment"># 如果想快速停止某个容器，可以使用kill</span>
$ <span class="token function">docker</span> <span class="token function">kill</span> name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看容器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-n</span> x	<span class="token comment"># 会显示最后x个容器，不论这个容器正在运行还是已经停止</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10-自动重启容器" tabindex="-1"><a class="header-anchor" href="#_10-自动重启容器" aria-hidden="true">#</a> 10. 自动重启容器</h3><p>如果由于某种错误而导致容器停止运行，还可以通过--restart 标志，让Docker自动重新启动该容器。--restart会检查容器的退出代码，并据此来决定是否要重启容器，默认是Docker不会重启容器</p><p>如果想要重启，有两种参数：</p><ul><li><p>always：无论退出代码是什么，都会重启该容器</p></li><li><p>unless-stopped：在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器</p></li><li><p>on-failure：只有当容器的退出代码为非0值的时候，才会自动重启</p><p>on-failure还接收一个可选的重启次数参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">--name</span> daemon_linux <span class="token parameter variable">-d</span> ubuntu:18.04 /bin/bash
$ <span class="token function">docker</span> run <span class="token parameter variable">--restart</span><span class="token operator">=</span>on-failure:5 <span class="token parameter variable">--name</span> daemon_linux <span class="token parameter variable">-d</span> ubuntu:18.04 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>其他：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器重启次数</span>
$ <span class="token function">docker</span> inspect <span class="token parameter variable">-f</span> <span class="token string">&quot;{{ .RestartCount }}&quot;</span> containerName
<span class="token comment"># 查看容器最后一次的启动时间</span>
$ <span class="token function">docker</span> inspect <span class="token parameter variable">-f</span> <span class="token string">&quot;{{ .State.StartedAt }}&quot;</span> containerName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-深入容器" tabindex="-1"><a class="header-anchor" href="#_11-深入容器" aria-hidden="true">#</a> 11. 深入容器</h3><p>查看容器详细信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> inspect name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,44),c=[l];function r(d,t){return n(),s("div",null,c)}const p=a(i,[["render",r],["__file","index.html.vue"]]);export{p as default};
