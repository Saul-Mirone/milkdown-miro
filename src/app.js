import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { gfm } from '@milkdown/preset-gfm';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { indent } from '@milkdown/plugin-indent';
import { prism } from '@milkdown/plugin-prism';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { history } from '@milkdown/plugin-history';
import { emoji } from '@milkdown/plugin-emoji';

const { board } = window.miro;

function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function markdown2CardContent(content) {
  return content.split('\n\n').map(x => `<p>${x}</p>`).join('');
}

function cardContent2Markdown(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const data = [...div.children].map(x => x.textContent).join('\n\n');
  return data;
}

async function init() {
  const selection = await board.getSelection();
  const [item] = selection;
  console.log('Current item:');
  console.log(item);

  const title = document.getElementById('title');
  const main = document.getElementById('main');
  main.style.borderColor = item.style.cardTheme;
  title.style.borderColor = item.style.cardTheme;
  title.innerHTML = item.title;

  let get;
  await Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, document.getElementById('editor'))
      ctx.set(defaultValueCtx, htmlDecode(cardContent2Markdown(item.description)));
      ctx.set(listenerCtx, {
        markdown: [
          (getMarkdown) => {
            get = getMarkdown;
          }
        ]
      })
    })
    .use(nord)
    .use(gfm)
    .use(listener)
    .use(indent)
    .use(prism)
    .use(tooltip)
    .use(slash)
    .use(history)
    .use(emoji)
    .create();
  
  document.getElementById('cancel').addEventListener('click', () => {
    board.ui.closeModal();
  });

  document.getElementById('save').addEventListener('click', async () => {
    if (get) {
      const content = get();
      item.description = markdown2CardContent(content);
      await board.sync(item);
    }
    board.ui.closeModal();
  });
}

init();
