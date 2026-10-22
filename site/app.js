const episodes = [
  {id:1,title:"Nghệ thuật bắt đầu lại",category:"Phát triển",duration:"18:42",host:"Minh Anh",symbol:"↗",cover:"lavender",description:"Những thay đổi nhỏ giúp bạn xây dựng một phiên bản tốt hơn của chính mình."},
  {id:2,title:"Công nghệ đang đổi thay",category:"Công nghệ",duration:"24:16",host:"Hoàng Nam",symbol:"⌘",cover:"blue",description:"Cùng nhìn vào những xu hướng công nghệ đang định hình cuộc sống."},
  {id:3,title:"Chậm lại giữa thành phố",category:"Đời sống",duration:"16:08",host:"Thảo My",symbol:"☼",cover:"orange",description:"Tìm những khoảng bình yên nhỏ giữa lịch trình bận rộn mỗi ngày."},
  {id:4,title:"Tư duy sáng tạo mỗi ngày",category:"Phát triển",duration:"21:35",host:"Gia Huy",symbol:"✳",cover:"pink",description:"Cách nuôi dưỡng trí tò mò và biến ý tưởng thành hành động."},
  {id:5,title:"AI và tương lai công việc",category:"Công nghệ",duration:"29:04",host:"Bảo Linh",symbol:"⌬",cover:"night",description:"Hiểu AI bằng ngôn ngữ gần gũi và chuẩn bị cho những thay đổi mới."},
  {id:6,title:"Một tách trà, một câu chuyện",category:"Đời sống",duration:"14:52",host:"Khánh Vy",symbol:"☕",cover:"green",description:"Những câu chuyện đời thường nhắc ta trân trọng hiện tại."}
];
const grid = document.querySelector("#podcast-grid");
const searchInput = document.querySelector("#search-input");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const savedCount = document.querySelector("#saved-count");
const toast = document.querySelector("#toast");
let activeCategory = "Tất cả";
let currentView = "all";
let currentEpisode = null;
let isPlaying = false;
let saved = new Set();
let recent = [];
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function visibleEpisodes() {
  const query = searchInput.value.trim().toLocaleLowerCase("vi");
  return episodes.filter(ep => {
    const matchesQuery = `${ep.title} ${ep.category} ${ep.host} ${ep.description}`.toLocaleLowerCase("vi").includes(query);
    const matchesCategory = activeCategory === "Tất cả" || ep.category === activeCategory;
    const matchesView = currentView === "saved" ? saved.has(ep.id) : currentView === "recent" ? recent.includes(ep.id) : true;
    return matchesQuery && matchesCategory && matchesView;
  });
}
function render() {
  const list = visibleEpisodes();
  resultCount.textContent = `${list.length} nội dung`;
  savedCount.textContent = saved.size;
  emptyState.classList.toggle("hidden", list.length !== 0);
  grid.classList.toggle("hidden", list.length === 0);
  grid.innerHTML = list.map(ep => `
    <article class="podcast-card">
      <div class="cover ${ep.cover}">
        <span class="cover-tag">PODCAST SERIES</span>
        <span class="cover-symbol">${ep.symbol}</span>
        <span class="cover-duration">${ep.duration}</span>
      </div>
      <div class="card-meta"><span class="category-pill">${ep.category}</span><span>✦ 4.9</span></div>
      <h3>${ep.title}</h3>
      <p>${ep.description}</p>
      <div class="card-bottom">
        <div class="host"><span class="host-avatar">${ep.host.charAt(0)}</span>${ep.host}</div>
        <div class="card-actions">
          <button class="icon-button ${saved.has(ep.id) ? "saved" : ""}" data-save="${ep.id}" aria-label="Lưu ${ep.title}">${saved.has(ep.id) ? "♥" : "♡"}</button>
          <button class="icon-button play-card" data-play="${ep.id}" aria-label="Phát ${ep.title}">▶</button>
        </div>
      </div>
    </article>`).join("");
}
function selectEpisode(id) {
  currentEpisode = episodes.find(ep => ep.id === id);
  if (!currentEpisode) return;
  recent = [id, ...recent.filter(x => x !== id)].slice(0, 5);
  document.querySelector("#now-title").textContent = currentEpisode.title;
  document.querySelector("#now-subtitle").textContent = `${currentEpisode.host} · ${currentEpisode.category}`;
  document.querySelector("#player-cover").textContent = currentEpisode.symbol;
  document.querySelector("#total-time").textContent = currentEpisode.duration;
  document.querySelector("#current-time").textContent = "00:00";
  document.querySelector("#progress").value = 0;
  isPlaying = true;
  document.querySelector("#main-play").textContent = "Ⅱ";
  render();
  notify(`Đã chọn: ${currentEpisode.title}. Đây là bản demo giao diện, chưa có tệp âm thanh.`);
}
grid.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  const playButton = event.target.closest("[data-play]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    saved.has(id) ? saved.delete(id) : saved.add(id);
    render();
    notify(saved.has(id) ? "Đã thêm vào thư viện đã lưu." : "Đã bỏ khỏi thư viện đã lưu.");
  } else if (playButton) selectEpisode(Number(playButton.dataset.play));
});
searchInput.addEventListener("input", render);
document.querySelectorAll(".filter-chip").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter-chip").forEach(b => b.classList.toggle("selected", b === button));
  render();
}));
document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => {
  currentView = button.dataset.view;
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b === button));
  const labels = {all:"Khám phá",saved:"Đã lưu",recent:"Nghe gần đây"};
  document.querySelector("#page-label").textContent = labels[currentView];
  document.querySelector("#library-title").textContent = currentView === "all" ? "Dành cho bạn" : labels[currentView];
  render();
  document.querySelector("#library").scrollIntoView({behavior:"smooth",block:"start"});
}));
document.querySelector("#main-play").addEventListener("click", () => {
  if (!currentEpisode) { notify("Hãy chọn một podcast trước nhé."); return; }
  isPlaying = !isPlaying;
  document.querySelector("#main-play").textContent = isPlaying ? "Ⅱ" : "▶";
  notify(isPlaying ? "Đang ở trạng thái phát demo." : "Đã tạm dừng demo.");
});
document.querySelector("#previous-button").addEventListener("click", () => {
  const index = episodes.findIndex(ep => ep.id === (currentEpisode?.id || episodes[0].id));
  selectEpisode(episodes[(index - 1 + episodes.length) % episodes.length].id);
});
document.querySelector("#next-button").addEventListener("click", () => {
  const index = episodes.findIndex(ep => ep.id === (currentEpisode?.id || episodes[episodes.length - 1].id));
  selectEpisode(episodes[(index + 1) % episodes.length].id);
});
document.querySelector("#progress").addEventListener("input", event => {
  const percent = Number(event.target.value);
  const totalSeconds = 18 * 60 + 42;
  const seconds = Math.floor(totalSeconds * percent / 100);
  document.querySelector("#current-time").textContent = `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;
});
render();
