---
layout: default
title: Achievements
---

# My Achievements

Welcome to my achievements page. Here you can find information about my certificates, education, awards, publications, and projects.

<div class="category-filter">
  <label for="achievement-category-select">Filter by category:</label>
  <select id="achievement-category-select" onchange="filterAchievements()">
    {% for achievement in site.achievements %}
      <option value="{{ achievement.category }}">{{ achievement.title }}</option>
    {% endfor %}
  </select>
</div>

{% for achievement in site.achievements %}
  <div class="achievement-category" data-category="{{ achievement.category }}">
    <h2>{{ achievement.title }}</h2>
    {{ achievement.content }}
    
    {% assign subcategories = site.data.achievement_categories[achievement.category].subcategories %}
    {% if subcategories %}
      <h3>Subcategories:</h3>
      <ul>
        {% for subcategory in subcategories %}
          <li>{{ subcategory | capitalize | replace: '_', ' ' }}</li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
{% endfor %}

<script>
function filterAchievements() {
  var select = document.getElementById('achievement-category-select');
  var selectedCategory = select.value;
  var categories = document.getElementsByClassName('achievement-category');
  
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].getAttribute('data-category') === selectedCategory) {
      categories[i].style.display = 'block';
    } else {
      categories[i].style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var achievementCategorySelect = document.getElementById('achievement-category-select');
  if (achievementCategorySelect) {
    achievementCategorySelect.addEventListener('change', filterAchievements);
    // 페이지 로드 시 첫 번째 카테고리 선택 및 필터링
    achievementCategorySelect.selectedIndex = 3;
    filterAchievements();
  }
});
</script>