const { board } = window.miro;

async function init() {
  await board.ui.on("icon:click", async () => {
    const selection = await board.getSelection();

    if (selection.length === 0) {
      return;
    }

    if (selection.length > 1) return;
    const [item] = selection;
    if (item.type !== 'card') return;

    await board.ui.openModal({ pageUrl: "app.html", fullscreen: true });
  });
}

init();
