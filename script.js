function toggleTheme() {
  if (document.body.classList.contains("dark"))
    document.body.classList.remove("dark");
  else
    document.body.classList.add("dark");
}

function handleFileSelect(event) {
  previewImage(event);

  // 파일이 선택되면 버튼 활성화
  const hasFile = event.target.files.length > 0;
  // document.getElementById('generateButton').disabled = !hasFile;
  document.getElementById('generateButtonKO').disabled = !hasFile;
  document.getElementById('generateButtonEN').disabled = !hasFile;
}

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function() {
    var output = document.getElementById('imagePreview');
    output.src = reader.result;
    output.classList.remove('hidden');
  };
  reader.readAsDataURL(event.target.files[0]);
}

function generateContent(language) {
  document.getElementById('response').innerHTML = '';
  const imageInput = document.getElementById('imageInput');

  if (imageInput.files.length === 0) {
    Swal.fire({
      title: '경고',
      text: '사진을 먼저 선택해주세요.',
      icon: 'warning',
      confirmButtonText: '확인'
    });
    return;
  }

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('generateButtonKO').classList.add('hidden'); 
  document.getElementById('generateButtonEN').classList.add('hidden'); 

  const formData = new FormData();
  formData.append('image', imageInput.files[0]);

  const Url = `https://port-0-santa-9zxht12blq81t0ot.sel4.cloudtype.app/generate/gift?language=${language}`
  // const Url = `http://localhost:3000/generate/gift?language=${language}`

  fetch(Url, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {  

      Swal.fire({
        title: '🎁GIFTs', 
        html: `<pre><code>${data.text}</code></pre>`, 
        imageUrl: "c-santa.png",
        imageWidth: 200,
        imageHeight: 200,
        confirmButtonText: '닫기'
      });

      document.getElementById('loading').classList.add('hidden');
      document.getElementById('generateButtonKO').classList.remove('hidden');
      document.getElementById('generateButtonEN').classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        title: '에러',
        text: '분석 중 에러가 발생했습니다!',
        icon: 'error',
        confirmButtonText: '닫기'
      });
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('generateButtonKO').classList.remove('hidden');
      document.getElementById('generateButtonEN').classList.remove('hidden');
    });
}
