import{_ as e,o as a,c as d,a as t}from"./app-a6a5d4a7.js";const r={},i=t('<p>2011年12月，<a href="https://baike.baidu.com/item/%E5%AF%86%E7%A0%81%E5%A4%96%E6%B3%84%E9%97%A8/4976608?fr=aladdin" target="_blank" rel="noopener noreferrer">密码外泄门</a> 造成了CSDN 2010年9月之前600多万明文帐号数据泄露，对用户账号造成了威胁。</p><p>CSDN发布声明：</p><blockquote><p>我们非常抱歉，发生了CSDN用户数据库泄露事件，您的用户密码可能被公开。我们恳切地请您修改CSDN相关密码，如果您在其他网站也使用同一密码。请一定同时修改相关网站的密码。</p><p>CSDN已向公安机关正式报案，公安机关也正在调查相关线索。</p><p>再次向您致以深深的歉意！</p></blockquote><p>可见，明文存储密码是很危险的，我们应该对用户的密码进行加密存储，并且这个加密过程是不可逆的！</p><h3 id="_1-用户注册和登录验证" tabindex="-1"><a class="header-anchor" href="#_1-用户注册和登录验证" aria-hidden="true">#</a> 1. 用户注册和登录验证</h3><p>密码加密不可逆后，又要怎么验证用户登录时输入的密码正确性呢？</p><p>我们以用户注册和登录验证为例，讲讲密码加密后如何进行密码正确性验证。</p><h4 id="_1-1-注册过程" tabindex="-1"><a class="header-anchor" href="#_1-1-注册过程" aria-hidden="true">#</a> 1.1 注册过程</h4><p>以下过程省略<u>用户名验证</u>和<u>密码复杂度限制</u>等</p><ol><li>前端首先对用户密码进行固定规则加密，生成加密字符串作为密码</li><li>后端接收前端创建用户请求，解析得到用户数据 <code>{username: &#39;mittacy&#39;, password: &#39;加密字符串&#39;}</code></li><li>采用某种加密算法再次进行加密，得到一串的字符串 <code>5e884898da28047151d0e56f8dc62</code></li><li>将 <code>{username: &#39;mittacy&#39;, password: &#39;5e884898da28047151d0e56f8dc62&#39;}</code> 插入数据库，返回注册成功</li></ol><h4 id="_1-2-登录过程" tabindex="-1"><a class="header-anchor" href="#_1-2-登录过程" aria-hidden="true">#</a> 1.2 登录过程</h4><ol><li>前端首先采用注册时同样的加密规则对用户密码加密，生成加密字符串作为密码</li><li>后端接收前端用户登录请求，解析得到用户数据 <code>{username: &#39;mittacy&#39;, password: &#39;加密字符串&#39;}</code></li><li>通过 <code>username</code> 到数据库查询得到正确的加密密码字符串，记为 <code>password</code></li><li>采用注册过程中的加密算法对密码进行加密，得到一串的字符串 <code>5e884898da28047151d0e56f8dc62</code>，记为requestPassword</li><li>对比<code>requestPassword</code> 和 <code>password</code> ，相同返回 登录成功，否则返回 登录失败</li></ol><p>可以看到，我们存储的密码是加密后的字符串，并且不可逆，即使数据库泄露，攻击者也只能拿到这些加密后的字符串，几乎无法反推真正的密码，更加安全，只要及时修改密码即可。</p><p>那我们应该采用哪种加密算法呢？首先明确要求：</p><ul><li>同一个密码 使用算法加密后 产生的字符串始终都是一样的</li><li>不同密码 使用算法加密后 的字符要尽可能的不同(理论上没法确保一定不同)</li><li>不可逆的，不能从加密字符串倒推出密码</li></ul><h3 id="_2-加密算法分类" tabindex="-1"><a class="header-anchor" href="#_2-加密算法分类" aria-hidden="true">#</a> 2. 加密算法分类</h3><ul><li><code>对称加密算法</code> 加密解密都是用同一个密钥，有AES、DES等</li><li><code>非对称加密算法</code> 加密解密使用不同的密钥：公钥和私钥，最有名的就是RSA</li><li><code>单向Hash算法</code> 主要用于验证，防止信息被修改，有 MD5、SHA1、SHA256、SHA512等</li></ul><p>对称加密和非对称加密都不符合我们的要求，因为数据库泄露了，密钥也很有可能泄露，这两种算法都能解密获取原密码。</p><p>单向Hash算法，比如MD5，无法通过计算还原出原始密码，而且两个字符串就算只是相差一个字符，计算出来的加密字符串也大不相同，重合率较低，所以很适合用来加密用户密码</p><p>关于MD5原理，有一篇有趣的文章可以看看 <a href="https://www.tomorrow.wiki/archives/503" target="_blank" rel="noopener noreferrer">漫画趣解MD5</a></p><p>以为这样子就可以安枕无忧了吗？当然不是。</p><h3 id="_3-彩虹表攻击" tabindex="-1"><a class="header-anchor" href="#_3-彩虹表攻击" aria-hidden="true">#</a> 3. 彩虹表攻击</h3><p>彩虹表原理：<a href="https://blog.csdn.net/whatday/article/details/88527936/" target="_blank" rel="noopener noreferrer">高效的密码攻击方法：彩虹表</a></p><h3 id="_4-防御彩虹表" tabindex="-1"><a class="header-anchor" href="#_4-防御彩虹表" aria-hidden="true">#</a> 4. 防御彩虹表</h3><h4 id="_4-1-客户端" tabindex="-1"><a class="header-anchor" href="#_4-1-客户端" aria-hidden="true">#</a> 4.1 客户端</h4><p>禁止使用简单的密码</p><h4 id="_4-2-服务端" tabindex="-1"><a class="header-anchor" href="#_4-2-服务端" aria-hidden="true">#</a> 4.2 服务端</h4><ul><li><p>使用更好的Hash算法</p><p>生成的字符串越长攻击者越难破解，但相应的计算速度越慢</p><p>下面是几种常用的单向Hash算法的对比</p><table><thead><tr><th>哈希</th><th>长度(bit)</th><th>数据库长度(byte)</th></tr></thead><tbody><tr><td>md5</td><td>128</td><td>16</td></tr><tr><td>sha1</td><td>160</td><td>20</td></tr><tr><td>sha256</td><td>256</td><td>32</td></tr><tr><td>sha512</td><td>512</td><td>64</td></tr></tbody></table></li><li><p>加盐</p><p>我们在收到用户注册的密码时，可以用一定的规则将密码和盐拼接组成新的密码串，再通过算法加密生成字符串存入数据库</p><p>随机盐使得彩虹表的建表难度大幅增加，随机盐的长度一般不能少于8字节</p></li></ul>',28),o=[i];function h(l,c){return a(),d("div",null,o)}const p=e(r,[["render",h],["__file","index.html.vue"]]);export{p as default};