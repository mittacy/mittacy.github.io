import{_ as a,o as e,c as t,a as i}from"./app-a6a5d4a7.js";const l={},s=i(`<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2><p><strong>注意，Mac一般没有分盘分区，重装系统就会全部格式化，所以数据必须都备份到U盘或其他电脑</strong></p><ul><li>大于8gU盘</li><li>MacOS系统镜像：<a href="http://www.pc6.com/pc/OSxtjx/" target="_blank" rel="noopener noreferrer">http://www.pc6.com/pc/OSxtjx/</a></li></ul><h2 id="一-下载" tabindex="-1"><a class="header-anchor" href="#一-下载" aria-hidden="true">#</a> 一. 下载</h2><p>app store或者其他可信任网站下载系统镜像，解压将app文件放入应用中(app store下载的就在应用中了)</p><h2 id="二-重装盘制作" tabindex="-1"><a class="header-anchor" href="#二-重装盘制作" aria-hidden="true">#</a> 二. 重装盘制作</h2><ol><li><p>格式化U盘</p><ul><li><code>command</code>+<code>空格</code>打开搜索工具输入“磁盘工具”打开磁盘工具</li><li><img src="https://static.mittacy.com/blog/20200228125424.jpeg" alt=""></li><li><img src="https://static.mittacy.com/blog/20200228125541.jpeg" alt=""></li></ul></li><li><p>打开终端根据要安装的系统包选择相应的命令(文末有多种版本命令)，比如我要安装的是Mojave，所以我输入</p></li></ol><p><code>sudo /Applications/Install\\ macOS\\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/mine</code></p><p><strong>注意mine是U盘的名字</strong></p><p>回车输入密码，注意这里输入密码不会显示被隐藏了，只管输入后回车就好了</p><p>等待完成</p><p><img src="https://static.mittacy.com/blog/20200228130352.png" alt=""></p><p>到这里系统U盘制作完成</p><h2 id="三-开始重装" tabindex="-1"><a class="header-anchor" href="#三-开始重装" aria-hidden="true">#</a> 三. 开始重装</h2><ul><li><p>关机状态下插入系统U盘，同时安装<code>option</code>&amp;<code>开机</code>键</p></li><li><p>选择第二个系统U盘启动</p><p><img src="https://static.mittacy.com/blog/20200229002559.jpeg" alt=""></p></li><li><p>进入磁盘工具抹除原系统</p><p><img src="https://static.mittacy.com/blog/20200229003133.jpeg" alt=""></p><p><img src="https://static.mittacy.com/blog/20200229003144.jpeg" alt=""></p></li><li><p>出来一直下一步到选择系统盘为安装盘</p><p><img src="https://static.mittacy.com/blog/20200229003254.jpeg" alt=""></p><p><img src="https://static.mittacy.com/blog/20200229003332.jpeg" alt=""></p><p>一直下一步然后就交给电脑自己安装了，坐一会儿出现这个画面就表示安装成功</p><p><img src="https://static.mittacy.com/blog/20200229003429.jpeg" alt=""></p><p>接下来自己认证设置一遍吧!</p></li></ul><h2 id="不同系统版本重装命令" tabindex="-1"><a class="header-anchor" href="#不同系统版本重装命令" aria-hidden="true">#</a> 不同系统版本重装命令</h2><h3 id="catalina" tabindex="-1"><a class="header-anchor" href="#catalina" aria-hidden="true">#</a> Catalina</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo /Applications/Install\\ macOS\\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以后在使用Catalina提示文件损坏无法打开的解决方法：</p><p>终端<code>sudo xattr -d com.apple.quarantine</code> 拉入应用回车输入密码</p><p>重新打开一般就可以打开了</p><h3 id="mojave" tabindex="-1"><a class="header-anchor" href="#mojave" aria-hidden="true">#</a> Mojave</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo /Applications/Install\\ macOS\\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="high-sierra" tabindex="-1"><a class="header-anchor" href="#high-sierra" aria-hidden="true">#</a> High Sierra</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo /Applications/Install\\ macOS\\ High\\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sierra" tabindex="-1"><a class="header-anchor" href="#sierra" aria-hidden="true">#</a> Sierra</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo /Applications/Install\\ macOS\\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\\ macOS\\ Sierra.app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="el-capitan" tabindex="-1"><a class="header-anchor" href="#el-capitan" aria-hidden="true">#</a> El Capitan</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo /Applications/Install\\ OS\\ X\\ El\\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\\ OS\\ X\\ El\\ Capitan.ap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,29),c=[s];function n(r,d){return e(),t("div",null,c)}const o=a(l,[["render",n],["__file","index.html.vue"]]);export{o as default};
