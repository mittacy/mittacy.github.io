import{_ as n,o as s,c as a,a as e}from"./app-a6a5d4a7.js";const i={},l=e(`<h3 id="_1-条件" tabindex="-1"><a class="header-anchor" href="#_1-条件" aria-hidden="true">#</a> 1. 条件</h3><ul><li><p>64位CPU</p></li><li><p>内核：Linux 3.8或更高版本内核</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查linux系统内核</span>
$ <span class="token function">uname</span> <span class="token parameter variable">-a</span>
Linux <span class="token punctuation">..</span>.4avy58ig34pcZ <span class="token number">4.15</span>.0-88-generic <span class="token comment">#88-Ubuntu SMP Tue Feb 11 20:11:34 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>检查Device Mapper</p><p>任何Ubuntu 12.04或更高版本的宿主机应该都已经安装了Device Mapper，可以通过代码确认是否已经安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token parameter variable">-l</span> /sys/class/misc/device-mapper
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar <span class="token number">17</span> <span class="token number">20</span>:55 /sys/class/misc/device-mapper -<span class="token operator">&gt;</span> <span class="token punctuation">..</span>/<span class="token punctuation">..</span>/devices/virtual/misc/device-mapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装依赖包</span>
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> gnupg-agent software-properties-common
<span class="token comment"># 添加 Docker 的官方 GPG 密钥</span>
$ <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token comment"># 验证您现在是否拥有带有指纹的密钥</span>
$ <span class="token function">sudo</span> apt-key fingerprint 0EBFCD88
<span class="token comment"># 设置稳定版仓库</span>
<span class="token comment"># 国内源</span>
$ <span class="token function">sudo</span> add-apt-repository <span class="token punctuation">\\</span>
    <span class="token string">&quot;deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \\
    <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> \\
    stable&quot;</span>
<span class="token comment"># 官方源</span>
$ <span class="token function">sudo</span> add-apt-repository <span class="token punctuation">\\</span>
    <span class="token string">&quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu \\
    <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> \\
    stable&quot;</span>
<span class="token comment"># 安装 Docker Engine-Community</span>
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-启动" tabindex="-1"><a class="header-anchor" href="#_3-启动" aria-hidden="true">#</a> 3. 启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动</span>
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
$ <span class="token function">sudo</span> systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试" aria-hidden="true">#</a> 4. 测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run hello-world
Unable to <span class="token function">find</span> image <span class="token string">&#39;hello-world:latest&#39;</span> locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:8e3114318a995a1ee497790535e7b88365222a21771ae7e53687ad76563e8e76
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">&quot;hello-world&quot;</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-镜像加速" tabindex="-1"><a class="header-anchor" href="#_5-镜像加速" aria-hidden="true">#</a> 5. 镜像加速</h3><p>国内从 Docker Hub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。国内很多云服务商都提供了国内加速器服务</p><p>对于使用 <a href="https://www.freedesktop.org/wiki/Software/systemd/" target="_blank" rel="noopener noreferrer">systemd</a> 的系统，请在 <code>/etc/docker/daemon.json</code> 中写入如下内容（如果文件不存在请新建该文件）</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;https://hub-mirror.c.163.com&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后重新启动服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查是否生效，执行 <code>$ docker info</code>，如果从结果中看到了如下内容，说明配置成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Registry Mirrors:
 https://hub-mirror.c.163.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-开启实验特性" tabindex="-1"><a class="header-anchor" href="#_6-开启实验特性" aria-hidden="true">#</a> 6. 开启实验特性</h3><p>一些 docker 命令或功能仅当 <strong>实验特性</strong> 开启时才能使用，请按照以下方法进行设置。</p><h3 id="_7-实验特性" tabindex="-1"><a class="header-anchor" href="#_7-实验特性" aria-hidden="true">#</a> 7. 实验特性</h3><h4 id="_7-1-开启-docker-cli-的实验特性" tabindex="-1"><a class="header-anchor" href="#_7-1-开启-docker-cli-的实验特性" aria-hidden="true">#</a> 7.1 开启 Docker CLI 的实验特性</h4><p>编辑 <code>~/.docker/config.json</code> 文件，新增如下条目</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;experimental&quot;</span><span class="token operator">:</span> <span class="token string">&quot;enabled&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者通过设置环境变量的方式：</p><p><strong>Linux/macOS</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">DOCKER_CLI_EXPERIMENTAL</span><span class="token operator">=</span>enabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_7-2-开启-dockerd-的实验特性" tabindex="-1"><a class="header-anchor" href="#_7-2-开启-dockerd-的实验特性" aria-hidden="true">#</a> 7.2 开启 Dockerd 的实验特性</h4><p>编辑 <code>/etc/docker/daemon.json</code>，新增如下条目</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;experimental&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),t=[l];function c(o,d){return s(),a("div",null,t)}const p=n(i,[["render",c],["__file","index.html.vue"]]);export{p as default};
