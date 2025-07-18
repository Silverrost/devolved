window.FinsweetAttributes ||= [];
window.FinsweetAttributes.push([
  'list',
    (listInstances) => {
      console.log('cmsload Successfully loaded!');
      listInstances.forEach((listInstance) => {
		var startAt = parseInt(listInstance.listElement.getAttribute('list-startsat'), 10);
		var perPage = parseInt(listInstance.listElement.getAttribute('list-perpage'), 10);
		listInstance.addHook('beforeRender', (items) => {
			var currentPage = listInstance.currentPage.value - 1;
			var no = startAt+perPage*currentPage;
			items.forEach((item) => {
				item.element.querySelector(".rank").textContent = no;
				no++;
			});
			return items;
		});
      });
    },
]);