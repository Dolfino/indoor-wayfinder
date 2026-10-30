import { Dispatch, SetStateAction } from "react";
import { graph } from "../algorithms/dijkstra";
import { Navigation, NavigationContextType } from "./types";
import { ObjectItem } from "./types";
import { graphData } from "@/store/graphData";
import { toast } from "react-toastify";
export let routeLength = 0;

const findVertexByObjectId = (vertexId: string) =>
  graphData.vertices.find((v) => v.objectName === vertexId);

export function navigateToObject(
  selectedObjectId: string,
  navigation: NavigationContextType["navigation"],
  setNavigation: NavigationContextType["setNavigation"]
) {
  const target = findVertexByObjectId(selectedObjectId);
  if (!target) {
    console.error("Target not found");
    toast.error("Local de destino não encontrado na malha de navegação.");
    return;
  }

  // Se o ponto de partida atual não existir na lista ou não for um ponto de localização válido,
  // usa o primeiro ponto de localização do usuário (não v_grid_) ou qualquer vértice válido
  let startId = navigation.start;
  let startVertex = graphData.vertices.find(
    (v) => v.id === startId && !v.id.startsWith("v_grid_") && !v.id.startsWith("v_door_") && !v.id.startsWith("v_junc_") && v.objectName === null
  );
  if (!startVertex) {
    startVertex =
      graphData.vertices.find(
        (v) =>
          v.objectName === null &&
          !v.id.startsWith("v_grid_") &&
          !v.id.startsWith("v_door_") &&
          !v.id.startsWith("v_junc_")
      ) || graphData.vertices.find((v) => v.objectName === null);
    if (startVertex) {
      startId = startVertex.id;
    }
  }

  const shortestPath = graph.calculateShortestPath(startId, target.id);
  if (shortestPath.length === 0) {
    toast.warning("Não foi possível traçar uma rota até este local.");
    return;
  }

  const pathString = shortestPath
    .slice(1)
    .map((vertexId) => {
      const vertex = graphData.vertices.find((v) => v.id === vertexId);
      return vertex ? `L${vertex.cx} ${vertex.cy}` : "";
    })
    .join(" ");

  const navigationRoutePath = document.getElementById("navigation-route");
  if (navigationRoutePath && startVertex) {
    navigationRoutePath.setAttribute(
      "d",
      `M${startVertex.cx} ${startVertex.cy} ${pathString}`
    );
    navigationRoutePath.classList.remove("path-once", "path-active");
    // Força reflow para reiniciar animação se clicar novamente
    void navigationRoutePath.getBoundingClientRect();
    navigationRoutePath.classList.add("path-once");
    navigationRoutePath.addEventListener(
      "animationend",
      () => {
        navigationRoutePath.classList.remove("path-once");
        navigationRoutePath.classList.add("path-active");
      },
      { once: true }
    );
  }

  setNavigation((prevNavigation) => ({
    ...prevNavigation,
    start: startId,
    end: selectedObjectId,
  }));
}

export function resetEdges() {
  document.getElementById("navigation-route")?.setAttribute("d", "");
  graphData.edges.forEach((edge) => {
    const element = document.getElementById(edge.id);
    if (element) {
      element.classList.remove("path-active");
    }
  });
}

export function navigateWithDelay(
  objects: ObjectItem[],
  index: number,
  delay: number,
  navigation: Navigation,
  setNavigation: Dispatch<SetStateAction<Navigation>>
) {
  if (index < objects.length) {
    const obj = objects[index];
    navigateToObject(obj.name, navigation, setNavigation);

    setTimeout(() => {
      navigateWithDelay(objects, index + 1, delay, navigation, setNavigation);
    }, delay);
  }
}
