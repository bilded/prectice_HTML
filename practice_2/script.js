document.addEventListener("DOMContentLoaded", function() {
  const homeSection = document.getElementById("homeSection");
  const cameraSection = document.getElementById("cameraSection");
  const messageSection = document.getElementById("messageSection");
  const homeBtn = document.getElementById("homeBtn");
  const cameraBtn = document.getElementById("cameraBtn");
  const messageBtn = document.getElementById("messageBtn");
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const captureBtn = document.getElementById("capture");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const messageList = document.getElementById("messageList");
  const playButton = document.getElementById('playButton');
  const captureButton = document.getElementById("capture");
  const capturedPhotosContainer = document.querySelector(".captured-photos");
  const cakeButton = document.getElementById("cakeButton");
  const cakeBtn = document.getElementById("cakeBtn");
  const cakeSection = document.getElementById("cakeSection");
  
  cakeBtn.addEventListener("click", function() {
    showCakeSection();
  });
  
  function showCakeSection() {
    hideAllSections();
    cakeSection.classList.remove("hidden");
    document.body.style.backgroundImage = "none"; // 배경 이미지 제거
  }
    
  function hideAllSections() {
    const sections = document.querySelectorAll("section:not(#cakeSection)");
    sections.forEach(function(section) {
      section.classList.add("hidden");
    });
  }

    // 홈으로 돌아가는 버튼 클릭 이벤트 처리
  homeBtn.addEventListener("click", function(event) {
    event.preventDefault();
    homeSection.classList.remove("hidden");
    cakeSection.classList.add("hidden"); // 수정: 케이크 섹션을 숨김
    homeSection.scrollIntoView({ behavior: "smooth" });
  });

  let isMusicPlaying = false; // 음악 재생 상태 변수

  // 음악 재생 버튼 클릭 시 실행할 내용
  function playButtonClick() {
    const videoId = '_YdFyzU8ryA&t=3233s'; // 유튜브 동영상의 ID를 여기에 입력하세요.
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
  
    // iframe을 생성하여 유튜브 동영상을 재생합니다.
    const iframe = document.createElement('iframe');
    iframe.src = youtubeUrl;
    iframe.allow = 'autoplay';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  
    // 재생 버튼을 비활성화합니다.
    playButton.disabled = true;
    isMusicPlaying = true;
  }
  
  // 음악 재생 버튼 클릭 이벤트 리스너
  playButton.addEventListener('click', function() {
    if (!isMusicPlaying) {
      playButtonClick();
    }
  });
  
  // 케이크 음악 재생 버튼 클릭 이벤트 리스너
  cakeButton.addEventListener("click", function() {
    if (isMusicPlaying) {
      // 음악 재생 중지 코드 추가
      const iframe = document.querySelector("iframe");
      iframe.remove();
      playButton.disabled = false;
      isMusicPlaying = false;
    }

  });


  let capturedPhotos = [];

  captureButton.addEventListener("click", capturePhoto);

  function capturePhoto() {
    const context = canvas.getContext("2d");
    
    // 비디오를 좌우 반전하여 그리기 위해 캔버스 좌표 시스템을 반전합니다
    context.save();
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    
    // 비디오를 그리고 이미지를 캡처합니다
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoURL = canvas.toDataURL();
    capturedPhotos.push(photoURL);
    
    // 캔버스 좌표 시스템을 원래대로 복원합니다
    context.restore();
  }
  

  function savePhotos() {
    capturedPhotosContainer.innerHTML = ""; // 기존에 출력된 이미지 초기화

    const latestPhotoURL = capturedPhotos[capturedPhotos.length - 1];
    if (latestPhotoURL) {
      const img = document.createElement("img");
      img.src = latestPhotoURL;
      img.classList.add("captured-photo");
      capturedPhotosContainer.appendChild(img);
    }
  }
/* 아래 버튼을 추가해서 
  // 이미지 저장 및 출력을 위한 버튼 추가
  const saveButton = document.createElement("button");
  saveButton.innerText = "저장된 이미지 출력";
  saveButton.classList.add("capture-btn");
  saveButton.addEventListener("click", savePhotos);
  document.body.appendChild(saveButton);
*/


  messageForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const message = messageInput.value;
    if (message.trim() !== "") {
      // 새로운 메시지 아이템 생성
      const messageItem = document.createElement("li");
      messageItem.textContent = message;
      
      // 메시지 아이템을 맨 앞에 추가
      messageList.prepend(messageItem);
      
      // 스크롤을 맨 위로 이동
      messageList.scrollTop = 0;
      
      // 입력칸 초기화
      messageInput.value = "";
    }
  });
  // 홈으로 돌아가는 버튼 클릭 이벤트 처리
  homeBtn.addEventListener("click", function(event) {
    event.preventDefault();
    homeSection.classList.remove("hidden");
    cameraSection.classList.add("hidden");
    messageSection.classList.add("hidden");
    homeSection.scrollIntoView({ behavior: "smooth" });
  });

  // 카메라 버튼 클릭 시
  cameraBtn.addEventListener("click", function() {
    homeSection.classList.add("hidden");
    cameraSection.classList.remove("hidden");
    messageSection.classList.add("hidden");
    cakeSection.classList.add("hidden"); // 케이크 섹션 숨김
  });

  // 메세지 버튼 클릭 시
  messageBtn.addEventListener("click", function() {
    homeSection.classList.add("hidden");
    cameraSection.classList.add("hidden");
    messageSection.classList.remove("hidden");
    cakeSection.classList.add("hidden"); // 케이크 섹션 숨김
  });

  // 비디오 스트림 가져오기
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      video.srcObject = stream;
    })
    .catch(function(error) {
      console.error("사용자 미디어 가져오기 에러:", error);
    });

    // 페이지 로드 시 첫 번째 화면 표시
    cameraSection.classList.add("hidden");
    messageSection.classList.add("hidden");
    cakeSection.classList.add("hidden"); // 케이크 섹션 숨김
});
