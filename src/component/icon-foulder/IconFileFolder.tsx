import Image, { StaticImageData } from "next/image";
import ui from "../../../public/icon-folder/ui.png";
import uiOpen from "../../../public/icon-folder/ui-open.png";
import folder1 from "../../../public/icon-folder/folder1.png";
import folder2 from "../../../public/icon-folder/folder2.png";
import folder3 from "../../../public/icon-folder/folder3.png";
import openFolder from "../../../public/icon-folder/open-folder.png";
import blueFolder from "../../../public/icon-folder/blue-folder.png";
import blueFolderOpen from "../../../public/icon-folder/blue-folder-open.png";
import favouriteFolder from "../../../public/icon-folder/favourite-folder.png";
import gallery from "../../../public/icon-folder/gallery.png";
import react from "../../../public/icon-folder/react.png";
import typescript from "../../../public/icon-folder/typescript.png";
import css from "../../../public/icon-folder/css.png";
import sass from "../../../public/icon-folder/sass2.png";
import json from "../../../public/icon-folder/json.png";
import home from "../../../public/icon-folder/home.png";
import util from "../../../public/icon-folder/util.png";
import utilOpen from "../../../public/icon-folder/util-open.png";
import setting from "../../../public/icon-folder/setting.png";
import settingOpen from "../../../public/icon-folder/setting-open.png";
import minimize from "../../../public/icon-folder/minimize.png";
import maximize from "../../../public/icon-folder/maximize.png";
import java from "../../../public/icon-folder/java.png";
import spring from "../../../public/icon-folder/spring.png";

export interface IconFileFolderCustom {
  icon: string;
  height: number;
  width: number;
}

export const IconFileFolder = ({
  icon,
  height,
  width,
}: IconFileFolderCustom) => {
  const iconMap: Record<string, StaticImageData> = {
    folder1,
    folder2,
    folder3,
    openFolder,
    blueFolderOpen,
    blueFolder,
    favouriteFolder,
    gallery,
    react,
    typescript,
    home,
    util,
    utilOpen,
    setting,
    settingOpen,
    ui,
    uiOpen,
    minimize,
    maximize,
    css,
    sass,
    json,
    java,
    spring,
  };

  const iconSrc = iconMap[icon] || folder1;
  return (
    <>
      <Image alt="icon" height={height} width={width} src={iconSrc} />
    </>
  );
};
