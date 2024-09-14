(function() {
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');
    var posts = [];
  
    // 포스트 데이터 로드
    fetch('/search.json')  // baseurl 추가
        .then(response => response.json())
        .then(data => {
            posts = data;
            console.log('Loaded posts:', posts); // 데이터 로드 확인
        })
        .catch(error => console.error('Error loading search data:', error));
  
    // 검색 이벤트 리스너
    searchInput.addEventListener('input', function() {
        var query = this.value.toLowerCase();
        console.log('Search query:', query); // 검색어 확인
        
        if (query.length < 1) {  // 1자 이상부터 검색 가능
            searchResults.style.display = 'none';
            return;
        }
  
        var results = posts.filter(function(post) {
            return post.title.toLowerCase().includes(query) ||
                   post.content.toLowerCase().includes(query) ||
                   (post.category && post.category.toLowerCase().includes(query)) ||
                   (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))); // 배열 태그 처리
        });
  
        console.log('Search results:', results); // 검색 결과 확인
        displayResults(results);
    });
  
    function truncateContent(content, limit) {
        return content.length > limit ? content.substring(0, limit) + '...' : content;
    }
  
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
        } else {
            var html = '<ul>';
            results.forEach(function(result) {
                html += '<li>';
                html += '<a href="' + result.url + '">' + result.title + '</a>';
                html += '<p>' + truncateContent(result.content, 100) + '</p>'; // 본문 길이 제한
                html += '</li>';
            });
            html += '</ul>';
            searchResults.innerHTML = html;
        }
        searchResults.style.display = 'block';
    }
})();
