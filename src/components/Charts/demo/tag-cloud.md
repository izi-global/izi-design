---
order: 9
title: Tag Cloud
---

A tag cloud is a set of related tags and a corresponding weight display. Typically, a typical tag cloud has between 30 and 150 tags, and the weight affects the font size or other visual effects used.
````jsx
import { TagCloud } from 'ant-design-pro/lib/Charts';

const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor((Math.random() * 50)) + 20,
  });
}

ReactDOM.render(
  <TagCloud
    data={tags}
    height={200}
  />
, mountNode);
````
