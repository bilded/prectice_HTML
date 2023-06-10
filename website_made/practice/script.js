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
  }
  
  function hideAllSections() {
    var sections = document.querySelectorAll("section");
    // const sections = document.querySelectorAll("section:not(#cakeSection)");
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
    playButton.disabled = false;
    playButton.innerText = '음악 멈춤';
    isMusicPlaying = true;
  }
  
  // 음악 멈춤 버튼 클릭 시 실행할 내용
  function stopButtonClick() {
    // iframe을 제거하여 음악을 멈춥니다.
    const iframe = document.querySelector('iframe');
    iframe.src = '';
    iframe.parentNode.removeChild(iframe);

    // 멈춤 버튼을 비활성화하고 재생 버튼을 활성화합니다.
    playButton.disabled = false;
    playButton.innerText = '음악 재생';
    isMusicPlaying = false;
  }

  // 음악 재생 버튼 클릭 이벤트 리스너
  playButton.addEventListener('click', function () {
    if (!isMusicPlaying) {
      playButtonClick();
    } else {
      stopButtonClick();
    }
      
  });


  // 음악 멈춤 버튼 클릭 이벤트 리스너
  cakeButton.addEventListener("click", function() {
    if (isMusicPlaying) {
      stopYouTubeVideo();
    } else {
      const videoId = 'KOGU_9PR6aM'; // 케이크 음악의 유튜브 동영상 ID를 입력하세요.
      const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

      // iframe을 생성하여 유튜브 동영상을 재생합니다.
      const iframe = document.createElement('iframe');
      iframe.src = youtubeUrl;
      iframe.allow = 'autoplay';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // 음악 멈춤 버튼 텍스트 변경
      cakeButton.innerText = '멈출까?';
      isMusicPlaying = true;
    }
  });

  // 음악 멈춤 함수
  function stopYouTubeVideo() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.parentNode.removeChild(iframe);
      isMusicPlaying = false;
      cakeButton.innerText = '다시 부를까?';
    }
  }
//사진을 캡처하고 캡처된 이미지 저장
  let capturedPhotos = [];

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

  captureButton.addEventListener("click", capturePhoto);
  // 이미지를 HTML에 추가하고 스타일을 적용하는 함수
  function displayCapturedPhotos() {
    const photoContainer = document.getElementById("photo-container");
    capturedPhotos.forEach(photoURL => {
      const photoElement = document.createElement("img");
      photoElement.src = photoURL;
      photoElement.classList.add("captured-photo"); // 이미지에 클래스 추가
      photoContainer.appendChild(photoElement);
    });
  } 


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
