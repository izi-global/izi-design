---
order: 0
title: 基础样例
---

结合 `Tag` 的 `TagSelect` 组件，方便的应用于筛选类目的业务场景中。

````jsx
import TagSelect from 'ant-design-pro/lib/TagSelect';

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

ReactDOM.render(
  <TagSelect onChange={handleFormSubmit}>
    <TagSelect.Option value="cat1">Danh mục 1</TagSelect.Option>
    <TagSelect.Option value="cat2">Danh mục 2</TagSelect.Option>
    <TagSelect.Option value="cat3">Danh mục 3</TagSelect.Option>
    <TagSelect.Option value="cat4">Danh mục 4</TagSelect.Option>
    <TagSelect.Option value="cat5">Danh mục 5</TagSelect.Option>
    <TagSelect.Option value="cat6">Danh mục 6</TagSelect.Option>
  </TagSelect>
, mountNode);
````
