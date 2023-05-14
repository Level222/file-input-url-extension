import { createFileByFetching } from "./create-file-by-fetching";
import { createDataTransfer } from "./create-data-transfer";
import { onContextMenuClick } from "./on-context-menu-click";

const isFileInput = (elem) => elem.tagName.toLowerCase() === "input" && elem.type === "file";

onContextMenuClick(async (target) => {
  const url = prompt("URL?");
  if (!url) {
    return;
  }

  try {
    const file = await createFileByFetching(url);
    const transfer = createDataTransfer([file]);

    if (isFileInput(target)) {
      target.files = transfer.files;
      target.dispatchEvent(new Event("change"));
    } else {
      target.dispatchEvent(new DragEvent("drop", {
        dataTransfer: transfer,
        bubbles: true
      }));
    }
  } catch {
    alert("Failed to fetch file.");
  }
});
