'use strict';

var indexHelper = {
  // デモメニューの構築
  buildDemoContents: function buildDemoContents(data) {
    var nodes = [];
    data.allDemos.forEach(function (_ref) {
      var title = _ref.title,
          category = _ref.category,
          order = _ref.order,
          path = _ref.path,
          _ref$disabled = _ref.disabled,
          disabled = _ref$disabled === void 0 ? false : _ref$disabled,
          _ref$categoryOrders = _ref.categoryOrders,
          categoryOrders = _ref$categoryOrders === void 0 ? {} : _ref$categoryOrders;

      if (!Array.isArray(category)) {
        category = [category];
      }

      var last = nodes;
      var obj;
      var level = 0;
      category.forEach(function (cat) {
        obj = last.find(function (e) {
          return e.title === cat;
        });

        if (!obj) {
          obj = {
            title: cat,
            contents: [],
            level: level,
            order: categoryOrders[cat] || Number.MAX_SAFE_INTEGER,
            disabled: false
          };
          last.push(obj);
        }

        last = obj.contents;
        level++;
      });
      var content = last.find(function (e) {
        return e.title === title;
      });

      if (!content) {
        content = {
          title: title,
          level: category.length,
          contents: []
        };
        last.push(content);
      }

      content.order = order;
      content.path = path;
      content.disabled = disabled;

      if (level === 0) {
        last.sort(function (a, b) {
          return data.demoCategorys.indexOf(a.title) - data.demoCategorys.indexOf(b.title);
        });
      } else {
        last.sort(function (a, b) {
          return a.order - b.order;
        });
      }
    });
    nodes.sort(function (a, b) {
      return data.demoCategorys.indexOf(a.title) - data.demoCategorys.indexOf(b.title);
    }); // console.log(JSON.stringify(nodes, null, '  '));

    return nodes;
  }
};
module.exports = {
  indexHelper: indexHelper
};