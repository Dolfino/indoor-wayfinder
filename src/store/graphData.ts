export interface VertexData {
  id: string;
  objectName: string | null;
  cx: number;
  cy: number;
}

export interface EdgeData {
  id: string;
  from: string;
  to: string;
}

export interface GraphData {
  vertices: VertexData[];
  edges: EdgeData[];
}

export function setGraphData(newData: GraphData) {
  graphData.vertices = newData.vertices;
  graphData.edges = newData.edges;
}

export const graphData: GraphData = {
  vertices: [
  {
    "id": "v_antonio_pompeu_norte",
    "objectName": null,
    "cx": 400,
    "cy": 357
  },
  {
    "id": "v_antonio_pompeu_meio_sup",
    "objectName": null,
    "cx": 400,
    "cy": 1245
  },
  {
    "id": "v_antonio_pompeu_centro",
    "objectName": null,
    "cx": 400,
    "cy": 2060
  },
  {
    "id": "v_antonio_pompeu_meio_inf",
    "objectName": null,
    "cx": 400,
    "cy": 2755
  },
  {
    "id": "v_meton_norte",
    "objectName": null,
    "cx": 613,
    "cy": 357
  },
  {
    "id": "v_meton_meio_sup",
    "objectName": null,
    "cx": 613,
    "cy": 1245
  },
  {
    "id": "v_meton_centro",
    "objectName": null,
    "cx": 613,
    "cy": 2060
  },
  {
    "id": "v_meton_meio_inf",
    "objectName": null,
    "cx": 613,
    "cy": 2755
  },
  {
    "id": "v_clarindo_norte",
    "objectName": null,
    "cx": 758,
    "cy": 357
  },
  {
    "id": "v_clarindo_meio_sup",
    "objectName": null,
    "cx": 758,
    "cy": 1245
  },
  {
    "id": "v_clarindo_centro",
    "objectName": null,
    "cx": 758,
    "cy": 2060
  },
  {
    "id": "v_clarindo_meio_inf",
    "objectName": null,
    "cx": 758,
    "cy": 2755
  },
  {
    "id": "v_duque_norte",
    "objectName": null,
    "cx": 903,
    "cy": 357
  },
  {
    "id": "v_duque_meio_sup",
    "objectName": null,
    "cx": 903,
    "cy": 1245
  },
  {
    "id": "v_duque_centro",
    "objectName": null,
    "cx": 903,
    "cy": 2060
  },
  {
    "id": "v_duque_meio_inf",
    "objectName": null,
    "cx": 903,
    "cy": 2755
  },
  {
    "id": "v_dom_pedro_norte",
    "objectName": null,
    "cx": 1047,
    "cy": 357
  },
  {
    "id": "v_dom_pedro_meio_sup",
    "objectName": null,
    "cx": 1047,
    "cy": 1245
  },
  {
    "id": "v_dom_pedro_centro",
    "objectName": null,
    "cx": 1047,
    "cy": 2060
  },
  {
    "id": "v_dom_pedro_meio_inf",
    "objectName": null,
    "cx": 1047,
    "cy": 2755
  },
  {
    "id": "v_pedro_pereira_norte",
    "objectName": null,
    "cx": 1192,
    "cy": 357
  },
  {
    "id": "v_pedro_pereira_meio_sup",
    "objectName": null,
    "cx": 1192,
    "cy": 1245
  },
  {
    "id": "v_pedro_pereira_centro",
    "objectName": null,
    "cx": 1192,
    "cy": 2060
  },
  {
    "id": "v_pedro_pereira_meio_inf",
    "objectName": null,
    "cx": 1192,
    "cy": 2755
  },
  {
    "id": "v_liberato_norte",
    "objectName": null,
    "cx": 1337,
    "cy": 357
  },
  {
    "id": "v_liberato_meio_sup",
    "objectName": null,
    "cx": 1337,
    "cy": 1245
  },
  {
    "id": "v_liberato_centro",
    "objectName": null,
    "cx": 1337,
    "cy": 2060
  },
  {
    "id": "v_liberato_meio_inf",
    "objectName": null,
    "cx": 1337,
    "cy": 2755
  },
  {
    "id": "v_guilherme_norte",
    "objectName": null,
    "cx": 1482,
    "cy": 357
  },
  {
    "id": "v_guilherme_meio_sup",
    "objectName": null,
    "cx": 1482,
    "cy": 1245
  },
  {
    "id": "v_guilherme_centro",
    "objectName": null,
    "cx": 1482,
    "cy": 2060
  },
  {
    "id": "v_guilherme_meio_inf",
    "objectName": null,
    "cx": 1482,
    "cy": 2755
  },
  {
    "id": "v_sao_paulo_norte",
    "objectName": null,
    "cx": 1626,
    "cy": 357
  },
  {
    "id": "v_sao_paulo_meio_sup",
    "objectName": null,
    "cx": 1626,
    "cy": 1245
  },
  {
    "id": "v_sao_paulo_centro",
    "objectName": null,
    "cx": 1626,
    "cy": 2060
  },
  {
    "id": "v_sao_paulo_meio_inf",
    "objectName": null,
    "cx": 1626,
    "cy": 2755
  },
  {
    "id": "v_senador_alencar_norte",
    "objectName": null,
    "cx": 1771,
    "cy": 357
  },
  {
    "id": "v_senador_alencar_meio_sup",
    "objectName": null,
    "cx": 1771,
    "cy": 1245
  },
  {
    "id": "v_senador_alencar_centro",
    "objectName": null,
    "cx": 1771,
    "cy": 2060
  },
  {
    "id": "v_senador_alencar_meio_inf",
    "objectName": null,
    "cx": 1771,
    "cy": 2755
  },
  {
    "id": "v_castro_silva_norte",
    "objectName": null,
    "cx": 1918,
    "cy": 357
  },
  {
    "id": "v_castro_silva_meio_sup",
    "objectName": null,
    "cx": 1918,
    "cy": 1245
  },
  {
    "id": "v_castro_silva_centro",
    "objectName": null,
    "cx": 1918,
    "cy": 2060
  },
  {
    "id": "v_castro_silva_meio_inf",
    "objectName": null,
    "cx": 1918,
    "cy": 2755
  },
  {
    "id": "v_dr_joao_norte",
    "objectName": null,
    "cx": 2063,
    "cy": 357
  },
  {
    "id": "v_dr_joao_meio_sup",
    "objectName": null,
    "cx": 2063,
    "cy": 1245
  },
  {
    "id": "v_dr_joao_centro",
    "objectName": null,
    "cx": 2063,
    "cy": 2060
  },
  {
    "id": "v_dr_joao_meio_inf",
    "objectName": null,
    "cx": 2063,
    "cy": 2755
  },
  {
    "id": "v_leste_norte",
    "objectName": null,
    "cx": 2100,
    "cy": 357
  },
  {
    "id": "v_leste_meio_sup",
    "objectName": null,
    "cx": 2100,
    "cy": 1245
  },
  {
    "id": "v_leste_centro",
    "objectName": null,
    "cx": 2100,
    "cy": 2060
  },
  {
    "id": "v_leste_meio_inf",
    "objectName": null,
    "cx": 2100,
    "cy": 2755
  },
  {
    "id": "v_senador_jaguaribe_norte",
    "objectName": null,
    "cx": 2208,
    "cy": 357
  },
  {
    "id": "v_senador_jaguaribe_meio_sup",
    "objectName": null,
    "cx": 2208,
    "cy": 1245
  },
  {
    "id": "v_senador_jaguaribe_centro",
    "objectName": null,
    "cx": 2208,
    "cy": 2060
  },
  {
    "id": "v_senador_jaguaribe_meio_inf",
    "objectName": null,
    "cx": 2208,
    "cy": 2755
  },
  {
    "id": "v_clarindo_sul",
    "objectName": null,
    "cx": 758,
    "cy": 2980
  },
  {
    "id": "v_duque_sul",
    "objectName": null,
    "cx": 903,
    "cy": 2980
  },
  {
    "id": "v_dom_pedro_sul",
    "objectName": null,
    "cx": 1047,
    "cy": 2980
  },
  {
    "id": "v_pedro_pereira_sul",
    "objectName": null,
    "cx": 1192,
    "cy": 2980
  },
  {
    "id": "v_liberato_sul",
    "objectName": null,
    "cx": 1337,
    "cy": 2980
  },
  {
    "id": "v_guilherme_sul",
    "objectName": null,
    "cx": 1482,
    "cy": 2980
  },
  {
    "id": "v_sao_paulo_sul",
    "objectName": null,
    "cx": 1626,
    "cy": 2980
  },
  {
    "id": "v_senador_alencar_sul",
    "objectName": null,
    "cx": 1771,
    "cy": 2980
  },
  {
    "id": "v_store_cf-mybag",
    "objectName": "MY BAG",
    "cx": 400,
    "cy": 670
  },
  {
    "id": "v_store_cf-sdbrand",
    "objectName": "SD BRAND",
    "cx": 400,
    "cy": 734
  },
  {
    "id": "v_store_cf-poseidon",
    "objectName": "POSEIDON",
    "cx": 400,
    "cy": 842
  },
  {
    "id": "v_store_cf-lovclub",
    "objectName": "LOV CLUB",
    "cx": 400,
    "cy": 966
  },
  {
    "id": "v_store_cf-vip",
    "objectName": "VIP",
    "cx": 400,
    "cy": 1135
  },
  {
    "id": "v_store_cf-hrd",
    "objectName": "HRD JEANS",
    "cx": 400,
    "cy": 1197
  },
  {
    "id": "v_store_cf-nanalu",
    "objectName": "NANALU",
    "cx": 400,
    "cy": 1304
  },
  {
    "id": "v_store_cf-tindolele",
    "objectName": "TINDOLELÊ",
    "cx": 400,
    "cy": 1366
  },
  {
    "id": "v_store_cf-cajutropical",
    "objectName": "CAJU TROPICAL",
    "cx": 400,
    "cy": 1428
  },
  {
    "id": "v_store_cf-saojorge",
    "objectName": "SÃO JORGE",
    "cx": 400,
    "cy": 1768
  },
  {
    "id": "v_store_cf-paineo",
    "objectName": "PAINÉO",
    "cx": 400,
    "cy": 1832
  },
  {
    "id": "v_store_cf-paineopraia",
    "objectName": "PAINÉO PRAIA",
    "cx": 400,
    "cy": 1890
  },
  {
    "id": "v_store_cf-offthelip",
    "objectName": "OFF THE LIP",
    "cx": 400,
    "cy": 2000
  },
  {
    "id": "v_store_cf-atacadaoinf",
    "objectName": "ATACADÃO INFANTIL",
    "cx": 400,
    "cy": 2060
  },
  {
    "id": "v_store_cf-coisasdeana",
    "objectName": "COISAS DE ANA",
    "cx": 400,
    "cy": 2123
  },
  {
    "id": "v_store_cf-socorro",
    "objectName": "SOCORRO MODAS",
    "cx": 400,
    "cy": 2230
  },
  {
    "id": "v_store_cf-classea",
    "objectName": "CLASSE A",
    "cx": 400,
    "cy": 2324
  },
  {
    "id": "v_store_cf-infinitylove",
    "objectName": "INFINITY LOVE",
    "cx": 400,
    "cy": 2462
  },
  {
    "id": "v_store_cf-missmyler",
    "objectName": "MISS MYLER",
    "cx": 400,
    "cy": 2553
  },
  {
    "id": "v_store_cf-moove",
    "objectName": "MOOVE! FITNESS",
    "cx": 400,
    "cy": 2725
  },
  {
    "id": "v_store_cf-escada1103",
    "objectName": "ENTRADA NORTE ESCADA 1103",
    "cx": 400,
    "cy": 357
  },
  {
    "id": "v_store_cf-economiafarma",
    "objectName": "ECONOMIA FARMA",
    "cx": 758,
    "cy": 2755
  },
  {
    "id": "v_store_cf-b1107",
    "objectName": "BOX 1107 - RUA CLARINDO DE QUEIROZ",
    "cx": 758,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1148",
    "objectName": "BOX 1148 - RUA CLARINDO DE QUEIROZ",
    "cx": 758,
    "cy": 1085
  },
  {
    "id": "v_store_cf-b1172",
    "objectName": "BOX 1172 - RUA CLARINDO DE QUEIROZ",
    "cx": 758,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1208",
    "objectName": "BOX 1208 - RUA CLARINDO DE QUEIROZ",
    "cx": 758,
    "cy": 1885
  },
  {
    "id": "v_store_cf-b1248",
    "objectName": "BOX 1248 - RUA CLARINDO DE QUEIROZ",
    "cx": 758,
    "cy": 2485
  },
  {
    "id": "v_store_cf-elevadores",
    "objectName": "ELEVADORES",
    "cx": 903,
    "cy": 2060
  },
  {
    "id": "v_store_cf-b1108",
    "objectName": "BOX 1108 - AV DUQUE DE CAXIAS",
    "cx": 903,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1140",
    "objectName": "BOX 1140 - AV DUQUE DE CAXIAS",
    "cx": 903,
    "cy": 1085
  },
  {
    "id": "v_store_cf-b1167",
    "objectName": "BOX 1167 - AV DUQUE DE CAXIAS",
    "cx": 903,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1203",
    "objectName": "BOX 1203 - AV DUQUE DE CAXIAS",
    "cx": 903,
    "cy": 1885
  },
  {
    "id": "v_store_cf-b1239",
    "objectName": "BOX 1239 - AV DUQUE DE CAXIAS",
    "cx": 903,
    "cy": 2485
  },
  {
    "id": "v_store_cf-patamar",
    "objectName": "PATAMAR CENTRAL",
    "cx": 1047,
    "cy": 2060
  },
  {
    "id": "v_store_cf-b1111",
    "objectName": "BOX 1111 - RUA DOM PEDRO I",
    "cx": 1047,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1143",
    "objectName": "BOX 1143 - RUA DOM PEDRO I",
    "cx": 1047,
    "cy": 1085
  },
  {
    "id": "v_store_cf-b1175",
    "objectName": "BOX 1175 - RUA DOM PEDRO I",
    "cx": 1047,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1211",
    "objectName": "BOX 1211 - RUA DOM PEDRO I",
    "cx": 1047,
    "cy": 1885
  },
  {
    "id": "v_store_cf-b1247",
    "objectName": "BOX 1247 - RUA DOM PEDRO I",
    "cx": 1047,
    "cy": 2485
  },
  {
    "id": "v_store_cf-coxinha",
    "objectName": "LOUCOS POR COXINHA",
    "cx": 1192,
    "cy": 2980
  },
  {
    "id": "v_store_cf-b1112",
    "objectName": "BOX 1112 - RUA PEDRO PEREIRA",
    "cx": 1192,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1144",
    "objectName": "BOX 1144 - RUA PEDRO PEREIRA",
    "cx": 1192,
    "cy": 1085
  },
  {
    "id": "v_store_cf-b1176",
    "objectName": "BOX 1176 - RUA PEDRO PEREIRA",
    "cx": 1192,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1212",
    "objectName": "BOX 1212 - RUA PEDRO PEREIRA",
    "cx": 1192,
    "cy": 1885
  },
  {
    "id": "v_store_cf-b1248",
    "objectName": "BOX 1248 - RUA PEDRO PEREIRA",
    "cx": 1192,
    "cy": 2485
  },
  {
    "id": "v_store_cf-esteira",
    "objectName": "ESTEIRA ROLANTE",
    "cx": 1337,
    "cy": 2060
  },
  {
    "id": "v_store_cf-b1115",
    "objectName": "BOX 1115 - RUA LIBERATO BARROSO",
    "cx": 1337,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1147",
    "objectName": "BOX 1147 - RUA LIBERATO BARROSO",
    "cx": 1337,
    "cy": 1085
  },
  {
    "id": "v_store_cf-b1179",
    "objectName": "BOX 1179 - RUA LIBERATO BARROSO",
    "cx": 1337,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1215",
    "objectName": "BOX 1215 - RUA LIBERATO BARROSO",
    "cx": 1337,
    "cy": 1885
  },
  {
    "id": "v_store_cf-b1251",
    "objectName": "BOX 1251 - RUA LIBERATO BARROSO",
    "cx": 1337,
    "cy": 2485
  },
  {
    "id": "v_store_cf-mcdonalds",
    "objectName": "QUIOSQUE MC",
    "cx": 1482,
    "cy": 2980
  },
  {
    "id": "v_store_cf-b1116",
    "objectName": "BOX 1116 - RUA GUILHERME ROCHA",
    "cx": 1482,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1180",
    "objectName": "BOX 1180 - RUA GUILHERME ROCHA",
    "cx": 1482,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1252",
    "objectName": "BOX 1252 - RUA GUILHERME ROCHA",
    "cx": 1482,
    "cy": 2485
  },
  {
    "id": "v_store_cf-b1119",
    "objectName": "BOX 1119 - RUA SÃO PAULO",
    "cx": 1626,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1183",
    "objectName": "BOX 1183 - RUA SÃO PAULO",
    "cx": 1626,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1255",
    "objectName": "BOX 1255 - RUA SÃO PAULO",
    "cx": 1626,
    "cy": 2485
  },
  {
    "id": "v_store_cf-espacoempada",
    "objectName": "ESPAÇO DA EMPADA",
    "cx": 1771,
    "cy": 2980
  },
  {
    "id": "v_store_cf-b1120",
    "objectName": "BOX 1120 - RUA SENADOR ALENCAR",
    "cx": 1771,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1184",
    "objectName": "BOX 1184 - RUA SENADOR ALENCAR",
    "cx": 1771,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1256",
    "objectName": "BOX 1256 - RUA SENADOR ALENCAR",
    "cx": 1771,
    "cy": 2485
  },
  {
    "id": "v_store_cf-b1123",
    "objectName": "BOX 1123 - RUA CASTRO E SILVA",
    "cx": 1918,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1187",
    "objectName": "BOX 1187 - RUA CASTRO E SILVA",
    "cx": 1918,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1260",
    "objectName": "BOX 1260 - RUA CASTRO E SILVA",
    "cx": 1918,
    "cy": 2485
  },
  {
    "id": "v_store_cf-intimadluxo",
    "objectName": "ÍNTIMA D LUXO",
    "cx": 2063,
    "cy": 610
  },
  {
    "id": "v_store_cf-mabelly",
    "objectName": "MABELLY",
    "cx": 2063,
    "cy": 671
  },
  {
    "id": "v_store_cf-rabella",
    "objectName": "RABELLA",
    "cx": 2063,
    "cy": 733
  },
  {
    "id": "v_store_cf-kairos",
    "objectName": "KAIROS 027",
    "cx": 2063,
    "cy": 840
  },
  {
    "id": "v_store_cf-mauna",
    "objectName": "MAÚNA",
    "cx": 2063,
    "cy": 903
  },
  {
    "id": "v_store_cf-souplus",
    "objectName": "SOUPLUS",
    "cx": 2063,
    "cy": 966
  },
  {
    "id": "v_store_cf-trilhajeans",
    "objectName": "TRILHA DO JEANS",
    "cx": 2063,
    "cy": 1073
  },
  {
    "id": "v_store_cf-acessorise",
    "objectName": "ACESSORISE",
    "cx": 2063,
    "cy": 1137
  },
  {
    "id": "v_store_cf-semprelinda",
    "objectName": "SEMPRE LINDA",
    "cx": 2063,
    "cy": 1199
  },
  {
    "id": "v_store_cf-luanypeniel",
    "objectName": "LUANY PENIEL",
    "cx": 2063,
    "cy": 1303
  },
  {
    "id": "v_store_cf-chezelle",
    "objectName": "CHEZ ELLE",
    "cx": 2063,
    "cy": 1367
  },
  {
    "id": "v_store_cf-jeitodvestir",
    "objectName": "JEITO D VESTIR",
    "cx": 2063,
    "cy": 1429
  },
  {
    "id": "v_store_cf-saggio",
    "objectName": "SAGGIO",
    "cx": 2063,
    "cy": 1536
  },
  {
    "id": "v_store_cf-mariafaceira",
    "objectName": "MARIA FACEIRA",
    "cx": 2063,
    "cy": 1630
  },
  {
    "id": "v_store_cf-fetich",
    "objectName": "FETICH",
    "cx": 2063,
    "cy": 1741
  },
  {
    "id": "v_store_cf-soulfit",
    "objectName": "SOUL FIT",
    "cx": 2063,
    "cy": 1819
  },
  {
    "id": "v_store_cf-missfunny",
    "objectName": "MISS FUNNY",
    "cx": 2063,
    "cy": 1882
  },
  {
    "id": "v_store_cf-folc",
    "objectName": "FOLC",
    "cx": 2063,
    "cy": 2230
  },
  {
    "id": "v_store_cf-doris",
    "objectName": "DORIS",
    "cx": 2063,
    "cy": 2323
  },
  {
    "id": "v_store_cf-abrand",
    "objectName": "A BRAND",
    "cx": 2063,
    "cy": 2462
  },
  {
    "id": "v_store_cf-dieckmann",
    "objectName": "DIECKMANN",
    "cx": 2063,
    "cy": 2524
  },
  {
    "id": "v_store_cf-bellalingerie",
    "objectName": "BELLA LINGERIE",
    "cx": 2063,
    "cy": 2693
  },
  {
    "id": "v_store_cf-atletique",
    "objectName": "ATLETIQUE FITNESS",
    "cx": 2063,
    "cy": 2786
  },
  {
    "id": "v_store_cf-escada1104",
    "objectName": "ENTRADA NORTE ESCADA 1104",
    "cx": 2063,
    "cy": 357
  },
  {
    "id": "v_store_cf-estacionamento",
    "objectName": "ESTACIONAMENTO CARRO E MOTO",
    "cx": 2063,
    "cy": 2060
  },
  {
    "id": "v_store_cf-b1124",
    "objectName": "BOX 1124 - RUA DR JOÃO MOREIRA",
    "cx": 2063,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1188",
    "objectName": "BOX 1188 - RUA DR JOÃO MOREIRA",
    "cx": 2063,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1264",
    "objectName": "BOX 1264 - RUA DR JOÃO MOREIRA",
    "cx": 2063,
    "cy": 2485
  },
  {
    "id": "v_store_cf-intimadluxo",
    "objectName": "ÍNTIMA D LUXO",
    "cx": 2100,
    "cy": 610
  },
  {
    "id": "v_store_cf-mabelly",
    "objectName": "MABELLY",
    "cx": 2100,
    "cy": 671
  },
  {
    "id": "v_store_cf-rabella",
    "objectName": "RABELLA",
    "cx": 2100,
    "cy": 733
  },
  {
    "id": "v_store_cf-kairos",
    "objectName": "KAIROS 027",
    "cx": 2100,
    "cy": 840
  },
  {
    "id": "v_store_cf-mauna",
    "objectName": "MAÚNA",
    "cx": 2100,
    "cy": 903
  },
  {
    "id": "v_store_cf-souplus",
    "objectName": "SOUPLUS",
    "cx": 2100,
    "cy": 966
  },
  {
    "id": "v_store_cf-trilhajeans",
    "objectName": "TRILHA DO JEANS",
    "cx": 2100,
    "cy": 1073
  },
  {
    "id": "v_store_cf-acessorise",
    "objectName": "ACESSORISE",
    "cx": 2100,
    "cy": 1137
  },
  {
    "id": "v_store_cf-semprelinda",
    "objectName": "SEMPRE LINDA",
    "cx": 2100,
    "cy": 1199
  },
  {
    "id": "v_store_cf-luanypeniel",
    "objectName": "LUANY PENIEL",
    "cx": 2100,
    "cy": 1303
  },
  {
    "id": "v_store_cf-chezelle",
    "objectName": "CHEZ ELLE",
    "cx": 2100,
    "cy": 1367
  },
  {
    "id": "v_store_cf-jeitodvestir",
    "objectName": "JEITO D VESTIR",
    "cx": 2100,
    "cy": 1429
  },
  {
    "id": "v_store_cf-saggio",
    "objectName": "SAGGIO",
    "cx": 2100,
    "cy": 1536
  },
  {
    "id": "v_store_cf-mariafaceira",
    "objectName": "MARIA FACEIRA",
    "cx": 2100,
    "cy": 1630
  },
  {
    "id": "v_store_cf-fetich",
    "objectName": "FETICH",
    "cx": 2100,
    "cy": 1741
  },
  {
    "id": "v_store_cf-soulfit",
    "objectName": "SOUL FIT",
    "cx": 2100,
    "cy": 1819
  },
  {
    "id": "v_store_cf-missfunny",
    "objectName": "MISS FUNNY",
    "cx": 2100,
    "cy": 1882
  },
  {
    "id": "v_store_cf-folc",
    "objectName": "FOLC",
    "cx": 2100,
    "cy": 2230
  },
  {
    "id": "v_store_cf-doris",
    "objectName": "DORIS",
    "cx": 2100,
    "cy": 2323
  },
  {
    "id": "v_store_cf-abrand",
    "objectName": "A BRAND",
    "cx": 2100,
    "cy": 2462
  },
  {
    "id": "v_store_cf-dieckmann",
    "objectName": "DIECKMANN",
    "cx": 2100,
    "cy": 2524
  },
  {
    "id": "v_store_cf-bellalingerie",
    "objectName": "BELLA LINGERIE",
    "cx": 2100,
    "cy": 2693
  },
  {
    "id": "v_store_cf-atletique",
    "objectName": "ATLETIQUE FITNESS",
    "cx": 2100,
    "cy": 2786
  },
  {
    "id": "v_store_cf-escada1104",
    "objectName": "ENTRADA NORTE ESCADA 1104",
    "cx": 2100,
    "cy": 357
  },
  {
    "id": "v_store_cf-estacionamento",
    "objectName": "ESTACIONAMENTO CARRO E MOTO",
    "cx": 2100,
    "cy": 2060
  },
  {
    "id": "v_store_cf-b1124",
    "objectName": "BOX 1124 - RUA DR JOÃO MOREIRA",
    "cx": 2100,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1188",
    "objectName": "BOX 1188 - RUA DR JOÃO MOREIRA",
    "cx": 2100,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1264",
    "objectName": "BOX 1264 - RUA DR JOÃO MOREIRA",
    "cx": 2100,
    "cy": 2485
  },
  {
    "id": "v_store_cf-b1128",
    "objectName": "BOX 1128 - RUA SENADOR JAGUARIBE",
    "cx": 2208,
    "cy": 515
  },
  {
    "id": "v_store_cf-b1192",
    "objectName": "BOX 1192 - RUA SENADOR JAGUARIBE",
    "cx": 2208,
    "cy": 1485
  },
  {
    "id": "v_store_cf-b1268",
    "objectName": "BOX 1268 - RUA SENADOR JAGUARIBE",
    "cx": 2208,
    "cy": 2485
  }
],
  edges: [
  {
    "id": "e1",
    "from": "v_antonio_pompeu_norte",
    "to": "v_meton_norte"
  },
  {
    "id": "e2",
    "from": "v_meton_norte",
    "to": "v_clarindo_norte"
  },
  {
    "id": "e3",
    "from": "v_clarindo_norte",
    "to": "v_duque_norte"
  },
  {
    "id": "e4",
    "from": "v_duque_norte",
    "to": "v_dom_pedro_norte"
  },
  {
    "id": "e5",
    "from": "v_dom_pedro_norte",
    "to": "v_pedro_pereira_norte"
  },
  {
    "id": "e6",
    "from": "v_pedro_pereira_norte",
    "to": "v_liberato_norte"
  },
  {
    "id": "e7",
    "from": "v_liberato_norte",
    "to": "v_guilherme_norte"
  },
  {
    "id": "e8",
    "from": "v_guilherme_norte",
    "to": "v_sao_paulo_norte"
  },
  {
    "id": "e9",
    "from": "v_sao_paulo_norte",
    "to": "v_senador_alencar_norte"
  },
  {
    "id": "e10",
    "from": "v_senador_alencar_norte",
    "to": "v_castro_silva_norte"
  },
  {
    "id": "e11",
    "from": "v_castro_silva_norte",
    "to": "v_dr_joao_norte"
  },
  {
    "id": "e12",
    "from": "v_dr_joao_norte",
    "to": "v_leste_norte"
  },
  {
    "id": "e13",
    "from": "v_leste_norte",
    "to": "v_senador_jaguaribe_norte"
  },
  {
    "id": "e14",
    "from": "v_antonio_pompeu_meio_sup",
    "to": "v_meton_meio_sup"
  },
  {
    "id": "e15",
    "from": "v_meton_meio_sup",
    "to": "v_clarindo_meio_sup"
  },
  {
    "id": "e16",
    "from": "v_clarindo_meio_sup",
    "to": "v_duque_meio_sup"
  },
  {
    "id": "e17",
    "from": "v_duque_meio_sup",
    "to": "v_dom_pedro_meio_sup"
  },
  {
    "id": "e18",
    "from": "v_dom_pedro_meio_sup",
    "to": "v_pedro_pereira_meio_sup"
  },
  {
    "id": "e19",
    "from": "v_pedro_pereira_meio_sup",
    "to": "v_liberato_meio_sup"
  },
  {
    "id": "e20",
    "from": "v_liberato_meio_sup",
    "to": "v_guilherme_meio_sup"
  },
  {
    "id": "e21",
    "from": "v_guilherme_meio_sup",
    "to": "v_sao_paulo_meio_sup"
  },
  {
    "id": "e22",
    "from": "v_sao_paulo_meio_sup",
    "to": "v_senador_alencar_meio_sup"
  },
  {
    "id": "e23",
    "from": "v_senador_alencar_meio_sup",
    "to": "v_castro_silva_meio_sup"
  },
  {
    "id": "e24",
    "from": "v_castro_silva_meio_sup",
    "to": "v_dr_joao_meio_sup"
  },
  {
    "id": "e25",
    "from": "v_dr_joao_meio_sup",
    "to": "v_leste_meio_sup"
  },
  {
    "id": "e26",
    "from": "v_leste_meio_sup",
    "to": "v_senador_jaguaribe_meio_sup"
  },
  {
    "id": "e27",
    "from": "v_antonio_pompeu_centro",
    "to": "v_meton_centro"
  },
  {
    "id": "e28",
    "from": "v_meton_centro",
    "to": "v_clarindo_centro"
  },
  {
    "id": "e29",
    "from": "v_clarindo_centro",
    "to": "v_duque_centro"
  },
  {
    "id": "e30",
    "from": "v_duque_centro",
    "to": "v_dom_pedro_centro"
  },
  {
    "id": "e31",
    "from": "v_dom_pedro_centro",
    "to": "v_pedro_pereira_centro"
  },
  {
    "id": "e32",
    "from": "v_pedro_pereira_centro",
    "to": "v_liberato_centro"
  },
  {
    "id": "e33",
    "from": "v_liberato_centro",
    "to": "v_guilherme_centro"
  },
  {
    "id": "e34",
    "from": "v_guilherme_centro",
    "to": "v_sao_paulo_centro"
  },
  {
    "id": "e35",
    "from": "v_sao_paulo_centro",
    "to": "v_senador_alencar_centro"
  },
  {
    "id": "e36",
    "from": "v_senador_alencar_centro",
    "to": "v_castro_silva_centro"
  },
  {
    "id": "e37",
    "from": "v_castro_silva_centro",
    "to": "v_dr_joao_centro"
  },
  {
    "id": "e38",
    "from": "v_dr_joao_centro",
    "to": "v_leste_centro"
  },
  {
    "id": "e39",
    "from": "v_leste_centro",
    "to": "v_senador_jaguaribe_centro"
  },
  {
    "id": "e40",
    "from": "v_antonio_pompeu_meio_inf",
    "to": "v_meton_meio_inf"
  },
  {
    "id": "e41",
    "from": "v_meton_meio_inf",
    "to": "v_clarindo_meio_inf"
  },
  {
    "id": "e42",
    "from": "v_clarindo_meio_inf",
    "to": "v_duque_meio_inf"
  },
  {
    "id": "e43",
    "from": "v_duque_meio_inf",
    "to": "v_dom_pedro_meio_inf"
  },
  {
    "id": "e44",
    "from": "v_dom_pedro_meio_inf",
    "to": "v_pedro_pereira_meio_inf"
  },
  {
    "id": "e45",
    "from": "v_pedro_pereira_meio_inf",
    "to": "v_liberato_meio_inf"
  },
  {
    "id": "e46",
    "from": "v_liberato_meio_inf",
    "to": "v_guilherme_meio_inf"
  },
  {
    "id": "e47",
    "from": "v_guilherme_meio_inf",
    "to": "v_sao_paulo_meio_inf"
  },
  {
    "id": "e48",
    "from": "v_sao_paulo_meio_inf",
    "to": "v_senador_alencar_meio_inf"
  },
  {
    "id": "e49",
    "from": "v_senador_alencar_meio_inf",
    "to": "v_castro_silva_meio_inf"
  },
  {
    "id": "e50",
    "from": "v_castro_silva_meio_inf",
    "to": "v_dr_joao_meio_inf"
  },
  {
    "id": "e51",
    "from": "v_dr_joao_meio_inf",
    "to": "v_leste_meio_inf"
  },
  {
    "id": "e52",
    "from": "v_leste_meio_inf",
    "to": "v_senador_jaguaribe_meio_inf"
  },
  {
    "id": "e53",
    "from": "v_clarindo_meio_inf",
    "to": "v_clarindo_sul"
  },
  {
    "id": "e54",
    "from": "v_duque_meio_inf",
    "to": "v_duque_sul"
  },
  {
    "id": "e55",
    "from": "v_dom_pedro_meio_inf",
    "to": "v_dom_pedro_sul"
  },
  {
    "id": "e56",
    "from": "v_pedro_pereira_meio_inf",
    "to": "v_pedro_pereira_sul"
  },
  {
    "id": "e57",
    "from": "v_liberato_meio_inf",
    "to": "v_liberato_sul"
  },
  {
    "id": "e58",
    "from": "v_guilherme_meio_inf",
    "to": "v_guilherme_sul"
  },
  {
    "id": "e59",
    "from": "v_sao_paulo_meio_inf",
    "to": "v_sao_paulo_sul"
  },
  {
    "id": "e60",
    "from": "v_senador_alencar_meio_inf",
    "to": "v_senador_alencar_sul"
  },
  {
    "id": "e61",
    "from": "v_clarindo_sul",
    "to": "v_duque_sul"
  },
  {
    "id": "e62",
    "from": "v_duque_sul",
    "to": "v_dom_pedro_sul"
  },
  {
    "id": "e63",
    "from": "v_dom_pedro_sul",
    "to": "v_pedro_pereira_sul"
  },
  {
    "id": "e64",
    "from": "v_pedro_pereira_sul",
    "to": "v_liberato_sul"
  },
  {
    "id": "e65",
    "from": "v_liberato_sul",
    "to": "v_guilherme_sul"
  },
  {
    "id": "e66",
    "from": "v_guilherme_sul",
    "to": "v_sao_paulo_sul"
  },
  {
    "id": "e67",
    "from": "v_sao_paulo_sul",
    "to": "v_senador_alencar_sul"
  },
  {
    "id": "e68",
    "from": "v_antonio_pompeu_norte",
    "to": "v_store_cf-escada1103"
  },
  {
    "id": "e69",
    "from": "v_store_cf-escada1103",
    "to": "v_store_cf-mybag"
  },
  {
    "id": "e70",
    "from": "v_store_cf-mybag",
    "to": "v_store_cf-sdbrand"
  },
  {
    "id": "e71",
    "from": "v_store_cf-sdbrand",
    "to": "v_store_cf-poseidon"
  },
  {
    "id": "e72",
    "from": "v_store_cf-poseidon",
    "to": "v_store_cf-lovclub"
  },
  {
    "id": "e73",
    "from": "v_store_cf-lovclub",
    "to": "v_store_cf-vip"
  },
  {
    "id": "e74",
    "from": "v_store_cf-vip",
    "to": "v_store_cf-hrd"
  },
  {
    "id": "e75",
    "from": "v_store_cf-hrd",
    "to": "v_antonio_pompeu_meio_sup"
  },
  {
    "id": "e76",
    "from": "v_antonio_pompeu_meio_sup",
    "to": "v_store_cf-nanalu"
  },
  {
    "id": "e77",
    "from": "v_store_cf-nanalu",
    "to": "v_store_cf-tindolele"
  },
  {
    "id": "e78",
    "from": "v_store_cf-tindolele",
    "to": "v_store_cf-cajutropical"
  },
  {
    "id": "e79",
    "from": "v_store_cf-cajutropical",
    "to": "v_store_cf-saojorge"
  },
  {
    "id": "e80",
    "from": "v_store_cf-saojorge",
    "to": "v_store_cf-paineo"
  },
  {
    "id": "e81",
    "from": "v_store_cf-paineo",
    "to": "v_store_cf-paineopraia"
  },
  {
    "id": "e82",
    "from": "v_store_cf-paineopraia",
    "to": "v_store_cf-offthelip"
  },
  {
    "id": "e83",
    "from": "v_store_cf-offthelip",
    "to": "v_antonio_pompeu_centro"
  },
  {
    "id": "e84",
    "from": "v_antonio_pompeu_centro",
    "to": "v_store_cf-atacadaoinf"
  },
  {
    "id": "e85",
    "from": "v_store_cf-atacadaoinf",
    "to": "v_store_cf-coisasdeana"
  },
  {
    "id": "e86",
    "from": "v_store_cf-coisasdeana",
    "to": "v_store_cf-socorro"
  },
  {
    "id": "e87",
    "from": "v_store_cf-socorro",
    "to": "v_store_cf-classea"
  },
  {
    "id": "e88",
    "from": "v_store_cf-classea",
    "to": "v_store_cf-infinitylove"
  },
  {
    "id": "e89",
    "from": "v_store_cf-infinitylove",
    "to": "v_store_cf-missmyler"
  },
  {
    "id": "e90",
    "from": "v_store_cf-missmyler",
    "to": "v_store_cf-moove"
  },
  {
    "id": "e91",
    "from": "v_store_cf-moove",
    "to": "v_antonio_pompeu_meio_inf"
  },
  {
    "id": "e92",
    "from": "v_meton_norte",
    "to": "v_meton_meio_sup"
  },
  {
    "id": "e93",
    "from": "v_meton_meio_sup",
    "to": "v_meton_centro"
  },
  {
    "id": "e94",
    "from": "v_meton_centro",
    "to": "v_meton_meio_inf"
  },
  {
    "id": "e95",
    "from": "v_clarindo_norte",
    "to": "v_store_cf-b1107"
  },
  {
    "id": "e96",
    "from": "v_store_cf-b1107",
    "to": "v_store_cf-b1148"
  },
  {
    "id": "e97",
    "from": "v_store_cf-b1148",
    "to": "v_clarindo_meio_sup"
  },
  {
    "id": "e98",
    "from": "v_clarindo_meio_sup",
    "to": "v_store_cf-b1172"
  },
  {
    "id": "e99",
    "from": "v_store_cf-b1172",
    "to": "v_store_cf-b1208"
  },
  {
    "id": "e100",
    "from": "v_store_cf-b1208",
    "to": "v_clarindo_centro"
  },
  {
    "id": "e101",
    "from": "v_clarindo_centro",
    "to": "v_store_cf-b1248"
  },
  {
    "id": "e102",
    "from": "v_store_cf-b1248",
    "to": "v_clarindo_meio_inf"
  },
  {
    "id": "e103",
    "from": "v_clarindo_meio_inf",
    "to": "v_store_cf-economiafarma"
  },
  {
    "id": "e104",
    "from": "v_store_cf-economiafarma",
    "to": "v_clarindo_sul"
  },
  {
    "id": "e105",
    "from": "v_duque_norte",
    "to": "v_store_cf-b1108"
  },
  {
    "id": "e106",
    "from": "v_store_cf-b1108",
    "to": "v_store_cf-b1140"
  },
  {
    "id": "e107",
    "from": "v_store_cf-b1140",
    "to": "v_duque_meio_sup"
  },
  {
    "id": "e108",
    "from": "v_duque_meio_sup",
    "to": "v_store_cf-b1167"
  },
  {
    "id": "e109",
    "from": "v_store_cf-b1167",
    "to": "v_store_cf-b1203"
  },
  {
    "id": "e110",
    "from": "v_store_cf-b1203",
    "to": "v_duque_centro"
  },
  {
    "id": "e111",
    "from": "v_duque_centro",
    "to": "v_store_cf-elevadores"
  },
  {
    "id": "e112",
    "from": "v_store_cf-elevadores",
    "to": "v_store_cf-b1239"
  },
  {
    "id": "e113",
    "from": "v_store_cf-b1239",
    "to": "v_duque_meio_inf"
  },
  {
    "id": "e114",
    "from": "v_dom_pedro_norte",
    "to": "v_store_cf-b1111"
  },
  {
    "id": "e115",
    "from": "v_store_cf-b1111",
    "to": "v_store_cf-b1143"
  },
  {
    "id": "e116",
    "from": "v_store_cf-b1143",
    "to": "v_dom_pedro_meio_sup"
  },
  {
    "id": "e117",
    "from": "v_dom_pedro_meio_sup",
    "to": "v_store_cf-b1175"
  },
  {
    "id": "e118",
    "from": "v_store_cf-b1175",
    "to": "v_store_cf-b1211"
  },
  {
    "id": "e119",
    "from": "v_store_cf-b1211",
    "to": "v_dom_pedro_centro"
  },
  {
    "id": "e120",
    "from": "v_dom_pedro_centro",
    "to": "v_store_cf-patamar"
  },
  {
    "id": "e121",
    "from": "v_store_cf-patamar",
    "to": "v_store_cf-b1247"
  },
  {
    "id": "e122",
    "from": "v_store_cf-b1247",
    "to": "v_dom_pedro_meio_inf"
  },
  {
    "id": "e123",
    "from": "v_pedro_pereira_norte",
    "to": "v_store_cf-b1112"
  },
  {
    "id": "e124",
    "from": "v_store_cf-b1112",
    "to": "v_store_cf-b1144"
  },
  {
    "id": "e125",
    "from": "v_store_cf-b1144",
    "to": "v_pedro_pereira_meio_sup"
  },
  {
    "id": "e126",
    "from": "v_pedro_pereira_meio_sup",
    "to": "v_store_cf-b1176"
  },
  {
    "id": "e127",
    "from": "v_store_cf-b1176",
    "to": "v_store_cf-b1212"
  },
  {
    "id": "e128",
    "from": "v_store_cf-b1212",
    "to": "v_pedro_pereira_centro"
  },
  {
    "id": "e129",
    "from": "v_pedro_pereira_centro",
    "to": "v_store_cf-b1248"
  },
  {
    "id": "e130",
    "from": "v_store_cf-b1248",
    "to": "v_pedro_pereira_meio_inf"
  },
  {
    "id": "e131",
    "from": "v_pedro_pereira_sul",
    "to": "v_store_cf-coxinha"
  },
  {
    "id": "e132",
    "from": "v_liberato_norte",
    "to": "v_store_cf-b1115"
  },
  {
    "id": "e133",
    "from": "v_store_cf-b1115",
    "to": "v_store_cf-b1147"
  },
  {
    "id": "e134",
    "from": "v_store_cf-b1147",
    "to": "v_liberato_meio_sup"
  },
  {
    "id": "e135",
    "from": "v_liberato_meio_sup",
    "to": "v_store_cf-b1179"
  },
  {
    "id": "e136",
    "from": "v_store_cf-b1179",
    "to": "v_store_cf-b1215"
  },
  {
    "id": "e137",
    "from": "v_store_cf-b1215",
    "to": "v_liberato_centro"
  },
  {
    "id": "e138",
    "from": "v_liberato_centro",
    "to": "v_store_cf-esteira"
  },
  {
    "id": "e139",
    "from": "v_store_cf-esteira",
    "to": "v_store_cf-b1251"
  },
  {
    "id": "e140",
    "from": "v_store_cf-b1251",
    "to": "v_liberato_meio_inf"
  },
  {
    "id": "e141",
    "from": "v_guilherme_norte",
    "to": "v_store_cf-b1116"
  },
  {
    "id": "e142",
    "from": "v_store_cf-b1116",
    "to": "v_guilherme_meio_sup"
  },
  {
    "id": "e143",
    "from": "v_guilherme_meio_sup",
    "to": "v_store_cf-b1180"
  },
  {
    "id": "e144",
    "from": "v_store_cf-b1180",
    "to": "v_guilherme_centro"
  },
  {
    "id": "e145",
    "from": "v_guilherme_centro",
    "to": "v_store_cf-b1252"
  },
  {
    "id": "e146",
    "from": "v_store_cf-b1252",
    "to": "v_guilherme_meio_inf"
  },
  {
    "id": "e147",
    "from": "v_guilherme_sul",
    "to": "v_store_cf-mcdonalds"
  },
  {
    "id": "e148",
    "from": "v_sao_paulo_norte",
    "to": "v_store_cf-b1119"
  },
  {
    "id": "e149",
    "from": "v_store_cf-b1119",
    "to": "v_sao_paulo_meio_sup"
  },
  {
    "id": "e150",
    "from": "v_sao_paulo_meio_sup",
    "to": "v_store_cf-b1183"
  },
  {
    "id": "e151",
    "from": "v_store_cf-b1183",
    "to": "v_sao_paulo_centro"
  },
  {
    "id": "e152",
    "from": "v_sao_paulo_centro",
    "to": "v_store_cf-b1255"
  },
  {
    "id": "e153",
    "from": "v_store_cf-b1255",
    "to": "v_sao_paulo_meio_inf"
  },
  {
    "id": "e154",
    "from": "v_senador_alencar_norte",
    "to": "v_store_cf-b1120"
  },
  {
    "id": "e155",
    "from": "v_store_cf-b1120",
    "to": "v_senador_alencar_meio_sup"
  },
  {
    "id": "e156",
    "from": "v_senador_alencar_meio_sup",
    "to": "v_store_cf-b1184"
  },
  {
    "id": "e157",
    "from": "v_store_cf-b1184",
    "to": "v_senador_alencar_centro"
  },
  {
    "id": "e158",
    "from": "v_senador_alencar_centro",
    "to": "v_store_cf-b1256"
  },
  {
    "id": "e159",
    "from": "v_store_cf-b1256",
    "to": "v_senador_alencar_meio_inf"
  },
  {
    "id": "e160",
    "from": "v_senador_alencar_sul",
    "to": "v_store_cf-espacoempada"
  },
  {
    "id": "e161",
    "from": "v_castro_silva_norte",
    "to": "v_store_cf-b1123"
  },
  {
    "id": "e162",
    "from": "v_store_cf-b1123",
    "to": "v_castro_silva_meio_sup"
  },
  {
    "id": "e163",
    "from": "v_castro_silva_meio_sup",
    "to": "v_store_cf-b1187"
  },
  {
    "id": "e164",
    "from": "v_store_cf-b1187",
    "to": "v_castro_silva_centro"
  },
  {
    "id": "e165",
    "from": "v_castro_silva_centro",
    "to": "v_store_cf-b1260"
  },
  {
    "id": "e166",
    "from": "v_store_cf-b1260",
    "to": "v_castro_silva_meio_inf"
  },
  {
    "id": "e167",
    "from": "v_dr_joao_norte",
    "to": "v_store_cf-escada1104"
  },
  {
    "id": "e168",
    "from": "v_store_cf-escada1104",
    "to": "v_store_cf-b1124"
  },
  {
    "id": "e169",
    "from": "v_store_cf-b1124",
    "to": "v_store_cf-intimadluxo"
  },
  {
    "id": "e170",
    "from": "v_store_cf-intimadluxo",
    "to": "v_store_cf-mabelly"
  },
  {
    "id": "e171",
    "from": "v_store_cf-mabelly",
    "to": "v_store_cf-rabella"
  },
  {
    "id": "e172",
    "from": "v_store_cf-rabella",
    "to": "v_store_cf-kairos"
  },
  {
    "id": "e173",
    "from": "v_store_cf-kairos",
    "to": "v_store_cf-mauna"
  },
  {
    "id": "e174",
    "from": "v_store_cf-mauna",
    "to": "v_store_cf-souplus"
  },
  {
    "id": "e175",
    "from": "v_store_cf-souplus",
    "to": "v_store_cf-trilhajeans"
  },
  {
    "id": "e176",
    "from": "v_store_cf-trilhajeans",
    "to": "v_store_cf-acessorise"
  },
  {
    "id": "e177",
    "from": "v_store_cf-acessorise",
    "to": "v_store_cf-semprelinda"
  },
  {
    "id": "e178",
    "from": "v_store_cf-semprelinda",
    "to": "v_dr_joao_meio_sup"
  },
  {
    "id": "e179",
    "from": "v_dr_joao_meio_sup",
    "to": "v_store_cf-luanypeniel"
  },
  {
    "id": "e180",
    "from": "v_store_cf-luanypeniel",
    "to": "v_store_cf-chezelle"
  },
  {
    "id": "e181",
    "from": "v_store_cf-chezelle",
    "to": "v_store_cf-jeitodvestir"
  },
  {
    "id": "e182",
    "from": "v_store_cf-jeitodvestir",
    "to": "v_store_cf-b1188"
  },
  {
    "id": "e183",
    "from": "v_store_cf-b1188",
    "to": "v_store_cf-saggio"
  },
  {
    "id": "e184",
    "from": "v_store_cf-saggio",
    "to": "v_store_cf-mariafaceira"
  },
  {
    "id": "e185",
    "from": "v_store_cf-mariafaceira",
    "to": "v_store_cf-fetich"
  },
  {
    "id": "e186",
    "from": "v_store_cf-fetich",
    "to": "v_store_cf-soulfit"
  },
  {
    "id": "e187",
    "from": "v_store_cf-soulfit",
    "to": "v_store_cf-missfunny"
  },
  {
    "id": "e188",
    "from": "v_store_cf-missfunny",
    "to": "v_dr_joao_centro"
  },
  {
    "id": "e189",
    "from": "v_dr_joao_centro",
    "to": "v_store_cf-estacionamento"
  },
  {
    "id": "e190",
    "from": "v_store_cf-estacionamento",
    "to": "v_store_cf-folc"
  },
  {
    "id": "e191",
    "from": "v_store_cf-folc",
    "to": "v_store_cf-doris"
  },
  {
    "id": "e192",
    "from": "v_store_cf-doris",
    "to": "v_store_cf-abrand"
  },
  {
    "id": "e193",
    "from": "v_store_cf-abrand",
    "to": "v_store_cf-b1264"
  },
  {
    "id": "e194",
    "from": "v_store_cf-b1264",
    "to": "v_store_cf-dieckmann"
  },
  {
    "id": "e195",
    "from": "v_store_cf-dieckmann",
    "to": "v_store_cf-bellalingerie"
  },
  {
    "id": "e196",
    "from": "v_store_cf-bellalingerie",
    "to": "v_dr_joao_meio_inf"
  },
  {
    "id": "e197",
    "from": "v_dr_joao_meio_inf",
    "to": "v_store_cf-atletique"
  },
  {
    "id": "e198",
    "from": "v_leste_norte",
    "to": "v_store_cf-escada1104"
  },
  {
    "id": "e199",
    "from": "v_store_cf-semprelinda",
    "to": "v_leste_meio_sup"
  },
  {
    "id": "e200",
    "from": "v_leste_meio_sup",
    "to": "v_store_cf-luanypeniel"
  },
  {
    "id": "e201",
    "from": "v_store_cf-missfunny",
    "to": "v_leste_centro"
  },
  {
    "id": "e202",
    "from": "v_leste_centro",
    "to": "v_store_cf-estacionamento"
  },
  {
    "id": "e203",
    "from": "v_store_cf-bellalingerie",
    "to": "v_leste_meio_inf"
  },
  {
    "id": "e204",
    "from": "v_leste_meio_inf",
    "to": "v_store_cf-atletique"
  },
  {
    "id": "e205",
    "from": "v_senador_jaguaribe_norte",
    "to": "v_store_cf-b1128"
  },
  {
    "id": "e206",
    "from": "v_store_cf-b1128",
    "to": "v_senador_jaguaribe_meio_sup"
  },
  {
    "id": "e207",
    "from": "v_senador_jaguaribe_meio_sup",
    "to": "v_store_cf-b1192"
  },
  {
    "id": "e208",
    "from": "v_store_cf-b1192",
    "to": "v_senador_jaguaribe_centro"
  },
  {
    "id": "e209",
    "from": "v_senador_jaguaribe_centro",
    "to": "v_store_cf-b1268"
  },
  {
    "id": "e210",
    "from": "v_store_cf-b1268",
    "to": "v_senador_jaguaribe_meio_inf"
  }
]
};
