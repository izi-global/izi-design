---
order: 1
title: 可展开和收起
---

使用 `expandable` 属性，让标签组可以收起，避免过高。

````jsx
import TagSelect from 'ant-design-pro/lib/TagSelect';

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

ReactDOM.render(
  <TagSelect onChange={handleFormSubmit} expandable>
    <TagSelect.Option value="cat1">Danh mục 1</TagSelect.Option>
    <TagSelect.Option value="cat2">Danh mục 2</TagSelect.Option>
    <TagSelect.Option value="cat3">Danh mục 3</TagSelect.Option>
    <TagSelect.Option value="cat4">Danh mục 4</TagSelect.Option>
    <TagSelect.Option value="cat5">Danh mục 5</TagSelect.Option>
    <TagSelect.Option value="cat6">Danh mục 6</TagSelect.Option>
    <TagSelect.Option value="cat7">Danh mục 7</TagSelect.Option>
    <TagSelect.Option value="cat8">Danh mục 8</TagSelect.Option>
    <TagSelect.Option value="cat9">Danh mục 9</TagSelect.Option>
    <TagSelect.Option value="cat10">Danh mục 10</TagSelect.Option>
    <TagSelect.Option value="cat11">Danh mục 11</TagSelect.Option>
    <TagSelect.Option value="cat12">Danh mục 12</TagSelect.Option>
  </TagSelect>
, mountNode);
````
