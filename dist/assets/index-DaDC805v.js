(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const v={JavaScript:"#f1e05a",TypeScript:"#3178c6",Python:"#3572A5",HTML:"#e34c26",CSS:"#563d7c",Vue:"#41b883",React:"#61dafb","C++":"#f34b7d",C:"#555555","C#":"#178600",Java:"#b07219",Rust:"#dea584",Go:"#00ADD8",PHP:"#4F5D95",Ruby:"#701516",Swift:"#F05138",Kotlin:"#A97BFF",Dart:"#00B4AB",Shell:"#89e051",PowerShell:"#012456",Dockerfile:"#384d54",Markdown:"#083fa1",SCSS:"#c6538c",Jupyter:"#DA5B0B"},p={"crimerate-prediction-analysis":{description:"Data analytics & machine learning project predicting crime rates, trends, and regional risk factors.",topics:["javascript","data-analysis","machine-learning","crime-analytics","web-app"]},"JD-Builder":{description:"Interactive Web Tool for crafting, formatting, and generating professional Job Descriptions and Resumes.",topics:["html5","css3","javascript","job-description","resume-builder"]}},c={currentUsername:"bhanusrikarsai",profile:null,repos:[],filteredRepos:[],events:[],languageStats:{},activeTheme:localStorage.getItem("gitportfolio_theme")||"dark"};let e={};function C(){e={themeBtn:document.getElementById("theme-btn"),themeMenu:document.getElementById("theme-menu"),themeOptions:document.querySelectorAll(".theme-option"),printBtn:document.getElementById("print-btn"),notificationBanner:document.getElementById("notification-banner"),notifMessage:document.getElementById("notif-message"),notifClose:document.getElementById("notif-close"),loadingState:document.getElementById("loading-state"),profileSection:document.getElementById("about"),userAvatar:document.getElementById("user-avatar"),userName:document.getElementById("user-name"),userLogin:document.getElementById("user-login"),userGithubLink:document.getElementById("user-github-link"),githubExternalLink:document.getElementById("github-external-link"),userBio:document.getElementById("user-bio"),statRepos:document.getElementById("stat-repos"),statContributions:document.getElementById("stat-contributions"),contributionChartImg:document.getElementById("contribution-chart-img"),langStackedBar:document.getElementById("lang-stacked-bar"),langLegend:document.getElementById("lang-legend"),reposGrid:document.getElementById("repos-grid"),repoCountBadge:document.getElementById("repo-count-badge"),repoSearchInput:document.getElementById("repo-search-input"),languageFilter:document.getElementById("language-filter"),sortFilter:document.getElementById("sort-filter"),noReposFound:document.getElementById("no-repos-found"),activityTimeline:document.getElementById("activity-timeline"),readmeModal:document.getElementById("readme-modal"),modalRepoName:document.getElementById("modal-repo-name"),modalReadmeContent:document.getElementById("modal-readme-content"),modalCloseBtn:document.getElementById("modal-close-btn")}}document.addEventListener("DOMContentLoaded",()=>{C(),M(),S(),w("bhanusrikarsai")});function M(){document.documentElement.setAttribute("data-theme",c.activeTheme),y()}function y(){e.themeOptions&&e.themeOptions.forEach(t=>{t.getAttribute("data-theme-val")===c.activeTheme?t.classList.add("active"):t.classList.remove("active")})}function $(t){c.activeTheme=t,localStorage.setItem("gitportfolio_theme",t),document.documentElement.setAttribute("data-theme",t),y(),e.themeMenu&&e.themeMenu.classList.add("hidden")}function S(){var t,a,n,i,o,r,d;e.themeBtn&&e.themeBtn.addEventListener("click",s=>{var m;s.stopPropagation(),(m=e.themeMenu)==null||m.classList.toggle("hidden")}),document.addEventListener("click",()=>{var s;(s=e.themeMenu)==null||s.classList.add("hidden")}),e.themeOptions&&e.themeOptions.forEach(s=>{s.addEventListener("click",()=>{$(s.getAttribute("data-theme-val"))})}),(t=e.printBtn)==null||t.addEventListener("click",()=>{window.print()}),(a=e.notifClose)==null||a.addEventListener("click",()=>{var s;(s=e.notificationBanner)==null||s.classList.add("hidden")}),(n=e.repoSearchInput)==null||n.addEventListener("input",f),(i=e.languageFilter)==null||i.addEventListener("change",f),(o=e.sortFilter)==null||o.addEventListener("change",f),(r=e.modalCloseBtn)==null||r.addEventListener("click",g),(d=e.readmeModal)==null||d.addEventListener("click",s=>{s.target===e.readmeModal&&g()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.readmeModal&&!e.readmeModal.classList.contains("hidden")&&g()})}async function w(t){h(!0),T(),e.contributionChartImg&&(e.contributionChartImg.src=`https://ghchart.rshah.org/${t}`);try{const a=await fetch(`https://api.github.com/users/${t}`);a.ok&&(c.profile=await a.json());const n=await fetch(`https://api.github.com/users/${t}/repos?per_page=100&sort=updated`);c.repos=n.ok?await n.json():[];const i=await fetch(`https://api.github.com/users/${t}/events/public?per_page=15`);c.events=i.ok?await i.json():[],R(),A(),_(),f(),D()}catch(a){console.error("Fetch error:",a),I("Network issue fetching GitHub profile.")}finally{h(!1)}}function h(t){e.loadingState&&(t?(e.loadingState.classList.remove("hidden"),e.profileSection&&(e.profileSection.style.opacity="0.4"),e.reposGrid&&(e.reposGrid.innerHTML="")):(e.loadingState.classList.add("hidden"),e.profileSection&&(e.profileSection.style.opacity="1")))}function I(t){!e.notifMessage||!e.notificationBanner||(e.notifMessage.textContent=t,e.notificationBanner.classList.remove("hidden"))}function T(){e.notificationBanner&&e.notificationBanner.classList.add("hidden")}function R(){const t=c.profile;e.userAvatar&&(e.userAvatar.src=(t==null?void 0:t.avatar_url)||"https://avatars.githubusercontent.com/u/277517838?v=4"),e.userName&&(e.userName.textContent=(t==null?void 0:t.name)||"Bhanu Srikar Sai"),e.userLogin&&(e.userLogin.textContent=(t==null?void 0:t.login)||"bhanusrikarsai"),e.userGithubLink&&(e.userGithubLink.href=(t==null?void 0:t.html_url)||"https://github.com/bhanusrikarsai"),e.githubExternalLink&&(e.githubExternalLink.href=(t==null?void 0:t.html_url)||"https://github.com/bhanusrikarsai"),e.userBio&&(t!=null&&t.bio)&&(e.userBio.textContent=t.bio),e.statRepos&&(e.statRepos.textContent=(t==null?void 0:t.public_repos)||c.repos.length||2),e.statContributions&&(e.statContributions.textContent="38+")}function A(){const t={};let a=0;c.repos.forEach(i=>{i.language&&(t[i.language]=(t[i.language]||0)+1,a++)}),c.languageStats=t;const n=Object.entries(t).sort((i,o)=>o[1]-i[1]);if(!(!e.langStackedBar||!e.langLegend)){if(e.langStackedBar.innerHTML="",e.langLegend.innerHTML="",a===0){e.langStackedBar.innerHTML='<div style="padding:4px; font-size:0.8rem; color:var(--text-muted);">JavaScript & HTML Stack</div>';return}n.forEach(([i,o])=>{const r=(o/a*100).toFixed(1),d=v[i]||"#818cf8",s=document.createElement("div");s.className="stacked-segment",s.style.width=`${r}%`,s.style.backgroundColor=d,s.title=`${i}: ${r}%`,e.langStackedBar.appendChild(s);const m=document.createElement("div");m.className="lang-legend-item",m.innerHTML=`
      <div class="lang-dot-wrap">
        <span class="lang-color-dot" style="background-color: ${d}"></span>
        <span class="lang-name">${i}</span>
      </div>
      <span class="lang-percent">${r}%</span>
    `,e.langLegend.appendChild(m)})}}function _(){if(!e.languageFilter)return;e.languageFilter.innerHTML='<option value="all">All Technologies</option>',Object.keys(c.languageStats).sort().forEach(a=>{const n=document.createElement("option");n.value=a,n.textContent=a,e.languageFilter.appendChild(n)})}function f(){var o,r,d,s,m;const t=(((o=e.repoSearchInput)==null?void 0:o.value)||"").toLowerCase().trim(),a=((r=e.languageFilter)==null?void 0:r.value)||"all",n=((d=e.sortFilter)==null?void 0:d.value)||"updated";let i=c.repos.filter(l=>{const u=p[l.name]||{},b=l.description||u.description||"",E=l.topics&&l.topics.length?l.topics:u.topics||[],L=l.name.toLowerCase().includes(t)||b.toLowerCase().includes(t)||E.some(k=>k.toLowerCase().includes(t)),B=a==="all"||l.language===a;return L&&B});if(i.sort((l,u)=>n==="stars"?u.stargazers_count-l.stargazers_count:n==="updated"?new Date(u.updated_at)-new Date(l.updated_at):n==="name"?l.name.localeCompare(u.name):0),c.filteredRepos=i,e.repoCountBadge&&(e.repoCountBadge.textContent=`${i.length} Projects`),!!e.reposGrid){if(e.reposGrid.innerHTML="",i.length===0){(s=e.noReposFound)==null||s.classList.remove("hidden");return}else(m=e.noReposFound)==null||m.classList.add("hidden");i.forEach(l=>{const u=x(l);e.reposGrid.appendChild(u)})}}function x(t){const a=document.createElement("div");a.className="glass-card repo-card";const n=p[t.name]||{},i=t.description||n.description||"Web application project developed by Bhanu Srikar Sai.",o=t.topics&&t.topics.length?t.topics:n.topics||[],r=v[t.language]||"#818cf8",d=o.slice(0,4).map(m=>`<span class="topic-tag">${m}</span>`).join("");return a.innerHTML=`
    <div>
      <div class="repo-top-row">
        <a href="${t.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name-link">
          <i class="fa-regular fa-folder-closed"></i> ${t.name}
        </a>
        <span class="repo-visibility">${t.visibility||"Public"}</span>
      </div>

      <p class="repo-desc">${i}</p>
      <div class="repo-topics">${d}</div>
    </div>

    <div>
      <div class="repo-footer">
        <div class="repo-stats">
          ${t.language?`
            <div class="repo-stat-item">
              <span style="width:10px; height:10px; border-radius:50%; background-color:${r}"></span>
              <span>${t.language}</span>
            </div>
          `:""}
          <div class="repo-stat-item" title="Stars">
            <i class="fa-regular fa-star"></i> ${t.stargazers_count||0}
          </div>
          <div class="repo-stat-item" title="Forks">
            <i class="fa-code-branch"></i> ${t.forks_count||0}
          </div>
        </div>

        <div class="repo-actions">
          <button class="btn btn-glass btn-sm readme-btn" data-repo="${t.name}" title="View README documentation">
            <i class="fa-solid fa-file-lines"></i> README
          </button>
          <a href="${t.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" title="View Source">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  `,a.querySelector(".readme-btn").addEventListener("click",()=>H(t.name)),a}function D(){if(e.activityTimeline){if(e.activityTimeline.innerHTML="",!c.events||c.events.length===0){e.activityTimeline.innerHTML=`
      <div class="activity-item">
        <div class="activity-icon-badge"><i class="fa-solid fa-code-commit"></i></div>
        <div class="activity-content">
          <div class="activity-title">Created 3 commits in <a href="https://github.com/bhanusrikarsai/crimerate-prediction-analysis" target="_blank">bhanusrikarsai/crimerate-prediction-analysis</a></div>
          <div class="activity-time">July 2026</div>
        </div>
      </div>
      <div class="activity-item">
        <div class="activity-icon-badge"><i class="fa-solid fa-plus"></i></div>
        <div class="activity-content">
          <div class="activity-title">Created repository <a href="https://github.com/bhanusrikarsai/JD-Builder" target="_blank">bhanusrikarsai/JD-Builder</a></div>
          <div class="activity-time">June 2026</div>
        </div>
      </div>
    `;return}c.events.forEach(t=>{var r,d,s,m,l;const a=document.createElement("div");a.className="activity-item";let n="fa-solid fa-code-commit",i="Pushed code to";t.type==="PushEvent"?(n="fa-solid fa-code-commit",i=`Pushed ${((d=(r=t.payload)==null?void 0:r.commits)==null?void 0:d.length)||1} commit(s) to`):t.type==="CreateEvent"?(n="fa-solid fa-plus",i=`Created ${((s=t.payload)==null?void 0:s.ref_type)||"repository"} in`):t.type==="WatchEvent"&&(n="fa-solid fa-star",i="Starred repository");const o=F(new Date(t.created_at));a.innerHTML=`
      <div class="activity-icon-badge">
        <i class="${n}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-title">
          ${i} <a href="https://github.com/${(m=t.repo)==null?void 0:m.name}" target="_blank" rel="noopener noreferrer">${(l=t.repo)==null?void 0:l.name}</a>
        </div>
        <div class="activity-time">${o}</div>
      </div>
    `,e.activityTimeline.appendChild(a)})}}function F(t){const a=Math.floor((new Date-t)/1e3);let n=Math.floor(a/86400);return n>=1?`${n} day${n>1?"s":""} ago`:(n=Math.floor(a/3600),n>=1?`${n} hour${n>1?"s":""} ago`:(n=Math.floor(a/60),n>=1?`${n} min${n>1?"s":""} ago`:"Just now"))}async function H(t){if(!e.modalRepoName||!e.modalReadmeContent||!e.readmeModal)return;e.modalRepoName.textContent=`${t} - Project Documentation`,e.modalReadmeContent.innerHTML='<div class="loading-readme"><i class="fa-solid fa-spinner fa-spin"></i> Fetching README documentation...</div>',e.readmeModal.classList.remove("hidden");const a=["main","master"];let n=null;for(const i of a)try{const o=await fetch(`https://raw.githubusercontent.com/${c.currentUsername}/${t}/${i}/README.md`);if(o.ok){n=await o.text();break}}catch{console.warn(`Could not fetch README on branch ${i}`)}if(n)window.marked?e.modalReadmeContent.innerHTML=window.marked.parse(n):e.modalReadmeContent.innerHTML=`<pre>${n}</pre>`;else{const i=p[t];i?e.modalReadmeContent.innerHTML=`
        <div style="padding: 1rem;">
          <h2 style="font-family:var(--font-heading); margin-bottom:1rem; border-bottom:1px solid var(--card-border); padding-bottom:0.5rem;">${t}</h2>
          <p style="font-size:1.05rem; margin-bottom:1.5rem;">${i.description}</p>
          <h3 style="font-family:var(--font-heading); margin-bottom:0.75rem;">Key Technologies & Tags</h3>
          <p style="margin-bottom:1.5rem;">${i.topics.map(o=>`<span class="topic-tag">${o}</span>`).join(" ")}</p>
          <a href="https://github.com/${c.currentUsername}/${t}" target="_blank" class="btn btn-primary">
            <i class="fa-brands fa-github"></i> View Full Repository Source Code
          </a>
        </div>
      `:e.modalReadmeContent.innerHTML=`
        <div style="text-align:center; padding: 2rem; color:var(--text-muted);">
          <i class="fa-solid fa-file-circle-xmark" style="font-size:2.5rem; margin-bottom:1rem; display:block;"></i>
          <p>No README.md file currently created for this project.</p>
        </div>
      `}}function g(){e.readmeModal&&e.readmeModal.classList.add("hidden")}
