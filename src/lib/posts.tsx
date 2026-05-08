import type { ReactNode } from "react";
import Link from "next/link";
import { TunerCTA } from "@/components/TunerCTA";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { PostFAQ } from "@/components/PostFAQ";
import { AFFILIATES } from "./affiliates";

export interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  Content: () => ReactNode;
}

function PostShellNav({ next }: { next?: { slug: string; title: string } }) {
  return (
    <nav className="not-prose mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-start">
      <Link
        href="/blog"
        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
      >
        ← Voltar para o blog
      </Link>
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="text-sm text-slate-300 hover:text-emerald-400 transition-colors text-right"
        >
          Próximo: <span className="font-semibold">{next.title}</span> →
        </Link>
      )}
    </nav>
  );
}

function ComoAfinarSemAfinador() {
  return (
    <>
      <p className="lead">
        Esquecer o afinador é frustrante, mas não precisa parar a prática. Dá
        para deixar o violão razoavelmente afinado usando uma corda de
        referência e o ouvido — e neste guia você aprende o método mais
        confiável passo a passo.
      </p>

      <h2>O método da quinta casa</h2>
      <p>
        A ideia é simples: a quinta casa de uma corda mais grave produz a
        mesma nota da corda imediatamente acima dela solta. Toque a quinta
        casa da 6ª corda (mi grave) e ajuste a 5ª (lá) até as duas notas
        soarem idênticas. Faça o mesmo entre 5ª e 4ª, 4ª e 3ª.
      </p>
      <p>
        Existe uma exceção: a 3ª e a 2ª corda. Aqui você toca a{" "}
        <strong>quarta casa</strong> da 3ª (sol) para afinar a 2ª (si). Depois
        volta para o método da quinta casa entre 2ª e 1ª.
      </p>

      <TunerCTA />

      <h2>Como saber se está chegando perto</h2>
      <p>
        Quando duas notas estão próximas mas não iguais, você ouve um efeito
        de pulsação — a famosa &ldquo;batida&rdquo; entre frequências. Quanto
        mais lenta a pulsação, mais perto da afinação correta. Se as notas
        soam totalmente paradas, sem ondulação, você acertou.
      </p>

      <h2>O ponto de partida</h2>
      <p>
        Esse método precisa de uma corda já afinada. Se você não tem nenhuma
        referência, tente:
      </p>
      <ul>
        <li>Usar a tecla A4 (lá central) de qualquer piano ou app de piano.</li>
        <li>
          Tocar a 5ª corda solta e comparar com a nota lá de uma música que você
          conhece bem.
        </li>
        <li>
          Em último caso, voltar para o{" "}
          <Link href="/">afinador online</Link> assim que tiver internet.
        </li>
      </ul>

      <h2>Dicas para acertar mais rápido</h2>
      <ul>
        <li>
          Toque as duas cordas <strong>juntas</strong>, não em sequência. A
          pulsação só aparece com as duas vibrando ao mesmo tempo.
        </li>
        <li>
          Aperte a tarraxa devagar. É mais fácil chegar lá pelo lado &ldquo;abaixo&rdquo;
          (apertando) do que pelo &ldquo;acima&rdquo; (soltando), porque cordas
          tensionadas guardam afinação melhor.
        </li>
        <li>
          Repita o ciclo duas vezes. Esticar uma corda muda a tensão das outras.
        </li>
      </ul>

      <AffiliateCTA
        headline="Quer dominar a afinação de ouvido de verdade?"
        body="Treinar afinação de ouvido leva semanas, mas com método o caminho fica muito mais curto. O curso abaixo é o que costumamos indicar para quem está começando."
        href={AFFILIATES.guitarCourse.href}
        label="Conhecer o curso"
      />

      <h2>Quando voltar para o afinador</h2>
      <p>
        Afinação de ouvido funciona para tocar sozinho ou em situações de
        emergência. Para tocar com outros instrumentos, gravar ou estudar
        intervalos, use sempre um afinador. A diferença de poucos cents que
        você não percebe sozinho fica gritante em conjunto.
      </p>

      <PostFAQ
        items={[
          {
            q: "Dá para afinar violão sem afinador e sem outro instrumento?",
            a: "Dá, mas a afinação fica relativa: as cordas estarão certas entre si, porém todas podem estar acima ou abaixo do tom padrão. Para tocar sozinho funciona bem; para tocar em conjunto, não.",
          },
          {
            q: "O método da quinta casa serve para violão e guitarra?",
            a: "Sim. As duas afinações Padrão são as mesmas (E A D G B E), então o método é idêntico. A única exceção continua sendo a 3ª-2ª corda, que usa a quarta casa.",
          },
          {
            q: "Quanto tempo leva para afinar de ouvido?",
            a: "No começo, de 5 a 10 minutos por sessão. Com prática, em poucas semanas você cai para menos de 1 minuto e detecta a pulsação rapidamente.",
          },
        ]}
      />

      <PostShellNav
        next={{
          slug: "drop-d-vs-afinacao-padrao",
          title: "Drop D vs Afinação Padrão",
        }}
      />
    </>
  );
}

function DropDvsPadrao() {
  return (
    <>
      <p className="lead">
        Drop D é a porta de entrada para afinações alternativas. Trocar uma
        única corda muda completamente a sonoridade do violão e libera
        acordes que na afinação Padrão exigem pestanas pesadas. Vale a pena
        adotar?
      </p>

      <h2>O que é Drop D</h2>
      <p>
        Drop D é a afinação Padrão (E A D G B E) com a sexta corda baixada um
        tom inteiro: vira <strong>D A D G B E</strong>. Só isso. As outras
        cinco cordas continuam exatamente no mesmo lugar.
      </p>

      <TunerCTA />

      <h2>Por que mudar</h2>
      <ul>
        <li>
          <strong>Power chords com um dedo só.</strong> Como a 6ª, 5ª e 4ª
          ficam afinadas em D-A-D, qualquer pestana de uma casa nas três
          forma um acorde de quinta perfeito.
        </li>
        <li>
          <strong>Mais grave disponível.</strong> O ré abaixo do mi grave dá
          peso à música — usado por bandas como Foo Fighters, Rage Against
          the Machine, Soundgarden.
        </li>
        <li>
          <strong>Acordes abertos novos.</strong> O ré maior aberto soa muito
          mais cheio, e o D9 e Dsus4 ficam fáceis.
        </li>
      </ul>

      <h2>Quando ficar na Padrão</h2>
      <p>
        Se você está tocando MPB, bossa nova, dedilhado clássico ou estudando
        cifras de iniciante, fique na Padrão. A grande maioria das cifras
        publicadas assume essa afinação, e mudar a 6ª corda toda hora
        desestabiliza a afinação geral até ela acomodar.
      </p>

      <AffiliateCTA
        headline="Cordas com tensão mais alta seguram melhor o Drop D"
        body="Cordas finas viram &ldquo;mole&rdquo; quando você baixa um tom inteiro. Para Drop D consistente, prefira encordoamentos 011 ou 012 em aço."
        href={AFFILIATES.amazonStrings.href}
        label="Ver opções de cordas"
      />

      <h2>Como passar para Drop D no afinador</h2>
      <p>
        No <Link href="/">afinador online</Link>, escolha &ldquo;Drop D&rdquo;
        no seletor de afinação. O afinador já saberá que a 6ª corda agora é
        D2 (~73,42 Hz). Toque a corda solta e ajuste a tarraxa até a agulha
        ficar no centro.
      </p>

      <h2>Drop D vs Drop C, B, A</h2>
      <p>
        Drop C baixa a 6ª para C e o resto um tom abaixo (C G C F A D), Drop B
        é um tom abaixo do C, Drop A mais um. Quanto mais grave, mais
        tensão você perde — em algum ponto cordas finas começam a tilintar
        e perder definição. Para iniciar em afinações &ldquo;baixadas&rdquo;,
        Drop D é o equilíbrio ideal: muito ganho sonoro, zero perda de
        playability.
      </p>

      <PostFAQ
        items={[
          {
            q: "Drop D estraga a afinação das outras cordas?",
            a: "Não, porque você só mexe na 6ª corda. As outras mantêm exatamente a mesma tensão. A única coisa a se atentar é que o braço pode ceder levemente quando você desafina — então afine de novo após 1 minuto.",
          },
          {
            q: "Posso usar a mesma corda fina em Drop D?",
            a: "Pode, mas vai parecer mole. Para Drop D regular, prefira 011-052 ou 012-054. Para Drop C ou abaixo, considere 013 ou superior.",
          },
          {
            q: "Drop D funciona em violão clássico (cordas de náilon)?",
            a: "Funciona, mas a corda fica bem mole. O resultado sonoro é diferente do que se imagina — clássico baixado soa abafado. Drop D é tradicionalmente um truque de aço/elétrico.",
          },
        ]}
      />

      <PostShellNav
        next={{
          slug: "afinador-online-vs-app",
          title: "Afinador online vs app de afinar",
        }}
      />
    </>
  );
}

function AfinadorOnlineVsApp() {
  return (
    <>
      <p className="lead">
        Afinador online no navegador ou app no celular? As duas opções funcionam,
        mas atendem cenários diferentes. Veja a comparação direta para
        decidir qual usar.
      </p>

      <h2>Precisão: empate técnico</h2>
      <p>
        Tanto afinadores web modernos quanto apps mobile usam algoritmos de
        detecção de pitch como YIN ou MPM, com precisão sub-cent. A
        diferença real está no microfone do dispositivo, não no software.
        Microfone de notebook tende a captar mais ruído ambiente; microfone
        de celular costuma ter ganho automático embutido que pode bagunçar
        leituras de cordas graves.
      </p>

      <TunerCTA />

      <h2>Latência: vantagem para o web hoje</h2>
      <p>
        Apps Android e iOS bem feitos têm latência baixíssima (5-15ms). Mas
        muitos apps gratuitos rodam sobre frameworks que adicionam atraso
        perceptível. Web Audio com AudioWorklet, em navegador moderno, fica
        em 30-50ms — bom o suficiente para afinar com naturalidade.
      </p>

      <h2>Recursos extras</h2>
      <ul>
        <li>
          <strong>Apps:</strong> exercícios, métricas de longo prazo,
          notificações, modo offline garantido, integração com pedais via
          Bluetooth.
        </li>
        <li>
          <strong>Web:</strong> sem download, sem permissão de instalação,
          atualização imediata, funciona em qualquer dispositivo.
        </li>
      </ul>

      <h2>Privacidade: o web ganha</h2>
      <p>
        Um afinador online bem feito não envia áudio pra lugar nenhum — o
        processamento acontece todo dentro do navegador. Apps gratuitos
        muitas vezes têm SDKs de anúncio que coletam telemetria pesada. Se
        privacidade importa, web tende a ser mais limpo.
      </p>

      <AffiliateCTA
        headline="Acabou de pegar um violão? Acelere a curva de aprendizado"
        body="Antes de comprar mil acessórios, o que mais economiza tempo é um curso estruturado. Esse aqui cobre do primeiro acorde até dedilhado em 8 semanas."
        href={AFFILIATES.guitarCourse.href}
        label="Ver curso recomendado"
      />

      <h2>Quando preferir cada um</h2>
      <p>
        <strong>Use afinador online quando:</strong> você está em frente ao
        computador, quer afinar rápido sem instalar nada, ou está usando um
        dispositivo emprestado.
      </p>
      <p>
        <strong>Use app quando:</strong> você toca em palco, na rua, sem
        internet garantida, ou quer recursos como afinador cromático com
        memória de afinação personalizada.
      </p>

      <PostFAQ
        items={[
          {
            q: "Afinador online captura áudio do meu microfone?",
            a: "Sim, precisa do microfone para detectar a frequência da corda. Em afinadores web bem implementados, o áudio nunca sai do navegador — todo o processamento acontece localmente via Web Audio API.",
          },
          {
            q: "Afinador online funciona offline?",
            a: "Sim, se for um PWA (Progressive Web App). Após a primeira visita, o afinador fica em cache e abre sem internet. Apps mobile têm essa garantia desde o primeiro uso.",
          },
          {
            q: "Posso usar afinador online no celular?",
            a: "Pode. Em Chrome ou Safari modernos a Web Audio API funciona perfeitamente. A única atenção é dar permissão de microfone — alguns navegadores em modo privado bloqueiam por padrão.",
          },
        ]}
      />

      <PostShellNav
        next={{
          slug: "quando-trocar-cordas-violao",
          title: "Quando trocar as cordas do violão",
        }}
      />
    </>
  );
}

function QuandoTrocarCordas() {
  return (
    <>
      <p className="lead">
        Cordas velhas perdem brilho, desafinam mais rápido e cansam os dedos.
        Mas trocar antes da hora é desperdício. Veja quando vale a troca.
      </p>

      <h2>Sinais de que está na hora</h2>
      <ul>
        <li>
          <strong>A corda não segura a afinação.</strong> Você afina, toca
          dois acordes, e o afinador já indica desvio. Sinal clássico de
          fadiga do metal.
        </li>
        <li>
          <strong>Som abafado, sem brilho.</strong> Cordas novas têm um
          &ldquo;chimer&rdquo; agudo que some com o uso. Quando o som fica
          plano, é hora.
        </li>
        <li>
          <strong>Marcas pretas ou ferrugem.</strong> Suor e oxidação
          atacam o entorchamento. Cordas com aspecto opaco perdem
          flexibilidade.
        </li>
        <li>
          <strong>Trastejamento ou afinação imprecisa em casas altas.</strong>{" "}
          Cordas estiradas demais não vibram uniformemente.
        </li>
      </ul>

      <TunerCTA />

      <h2>Frequência de troca por uso</h2>
      <ul>
        <li>
          <strong>Iniciante (30 min/dia, 4x semana):</strong> a cada 3-4 meses.
        </li>
        <li>
          <strong>Praticante regular (1h/dia):</strong> a cada 6-8 semanas.
        </li>
        <li>
          <strong>Tocando em palco / gravando:</strong> a cada 1-2 semanas para
          som consistente.
        </li>
      </ul>

      <h2>Como aumentar a vida útil</h2>
      <p>
        Lave as mãos antes de tocar e passe um pano seco no encordoamento ao
        terminar. O pH do suor varia muito de pessoa para pessoa — quem tem
        suor mais ácido vê cordas oxidando em duas semanas, enquanto outros
        seguram quatro meses sem trocar. O pano resolve 80% do problema sem
        precisar de produtos especiais.
      </p>

      <AffiliateCTA
        headline="Tempo de trocar? Esses encordoamentos são os mais pedidos"
        body="Para violão de aço, marcas como D'Addario e Elixir têm o melhor custo-benefício. Para náilon, Augustine e D'Addario Pro-Arté."
        href={AFFILIATES.amazonStrings.href}
        label="Ver encordoamentos"
      />

      <h2>O cuidado da troca afeta a afinação</h2>
      <p>
        Cordas novas esticam muito nas primeiras 24 horas. Depois de
        trocar, espere até afinar com{" "}
        <Link href="/">o afinador</Link>: tocar uma música nova ou
        bender as cordas algumas vezes acelera o processo de acomodação.
      </p>

      <PostFAQ
        items={[
          {
            q: "Posso trocar uma corda só?",
            a: "Pode, mas o som fica desbalanceado: a nova vai brilhar e as velhas vão soar abafadas. Idealmente, troque o jogo inteiro.",
          },
          {
            q: "Cordas mais grossas afinam melhor?",
            a: "Não — cordas mais grossas têm tensão maior, então são mais estáveis em afinações baixas (Drop D, Drop C). Para afinação Padrão, espessura média (011 em aço, normal em náilon) é o ideal.",
          },
          {
            q: "Vale a pena cordas revestidas (coated)?",
            a: "Sim, especialmente para quem sua mais ou toca menos. Elas duram 3-5x mais que cordas comuns, com mínima perda de brilho. Custam mais, mas o custo por mês de uso é menor.",
          },
        ]}
      />

      <PostShellNav
        next={{
          slug: "como-treinar-ouvido-musical",
          title: "Como treinar o ouvido musical",
        }}
      />
    </>
  );
}

function ComoTreinarOuvido() {
  return (
    <>
      <p className="lead">
        Ouvido afinado não é dom — é habilidade treinável. Em 15 minutos por
        dia durante 6 a 8 semanas, qualquer pessoa consegue identificar
        notas isoladas e cair na afinação correta sem afinador.
      </p>

      <h2>Comece pela referência</h2>
      <p>
        Toque o A4 (lá central, 440 Hz) todo dia antes de afinar. Cante. Pare,
        toque de novo, compare. Esse é o exercício mais simples e mais
        poderoso: você está calibrando uma referência interna que vai virar
        sua &ldquo;memória de altura&rdquo;.
      </p>

      <TunerCTA />

      <h2>Identificar intervalos</h2>
      <p>
        Depois da nota fixa, treine intervalos. Cada intervalo tem uma
        sonoridade única que pode ser memorizada associando a uma música
        conhecida:
      </p>
      <ul>
        <li>
          <strong>Quinta justa</strong> — &ldquo;Twinkle Twinkle Little Star&rdquo;
          (do-do, sol-sol).
        </li>
        <li>
          <strong>Quarta justa</strong> — &ldquo;Here Comes the Bride&rdquo;.
        </li>
        <li>
          <strong>Oitava</strong> — &ldquo;Somewhere Over the Rainbow&rdquo;.
        </li>
        <li>
          <strong>Terça maior</strong> — primeiras notas de &ldquo;When the
          Saints Go Marching In&rdquo;.
        </li>
      </ul>

      <h2>O exercício da pulsação</h2>
      <p>
        Toque duas cordas próximas e ouça a pulsação. Ajuste uma delas até a
        pulsação desaparecer. Esse é o mesmo método explicado em{" "}
        <Link href="/blog/como-afinar-violao-sem-afinador">
          como afinar sem afinador
        </Link>{" "}
        — repeti-lo deliberadamente todo dia treina seu cérebro a detectar
        diferenças de poucos cents.
      </p>

      <AffiliateCTA
        headline="Treino de ouvido estruturado em 8 semanas"
        body="Ear training não funciona sem rotina. Esse curso traz o método mais usado por professores particulares no Brasil."
        href={AFFILIATES.guitarCourse.href}
        label="Quero treinar ouvido"
      />

      <h2>Tocar de ouvido começa aqui</h2>
      <p>
        Pegue uma música simples que você conhece de cor (parabéns, asa
        branca) e tente reproduzir no violão sem cifra. Você vai errar — e
        é exatamente nesses erros que o ouvido aprende. Use o afinador como
        verificador: quando achar a nota, confirme que é mesmo a nota que
        você imaginou.
      </p>

      <h2>Aplicativos vs prática direta</h2>
      <p>
        Apps de ear training (EarMaster, Functional Ear Trainer) ajudam, mas
        não substituem prática com instrumento real. Use 5 minutos de app
        para quentar e 10 minutos tocando música para fixar.
      </p>

      <PostFAQ
        items={[
          {
            q: "É possível ter ouvido absoluto na vida adulta?",
            a: "Ouvido absoluto puro (identificar notas isoladas sem referência) é raro depois da infância, mas o ouvido relativo — que é o que importa para tocar música — é completamente treinável em qualquer idade.",
          },
          {
            q: "Quantas semanas até notar diferença?",
            a: "Com 15 minutos por dia, a maioria das pessoas começa a identificar intervalos comuns na 3ª-4ª semana. Em 8 semanas você consegue afinar de ouvido com erro de menos de 10 cents.",
          },
          {
            q: "Cantar enquanto toca atrapalha o ouvido?",
            a: "Pelo contrário — cantar a nota antes de procurar no violão é um dos melhores exercícios. Você está forçando seu cérebro a prever a altura, o que treina a memória de pitch direto.",
          },
        ]}
      />

      <PostShellNav />
    </>
  );
}

export const POSTS: Post[] = [
  {
    slug: "como-afinar-violao-sem-afinador",
    title: "Como afinar violão sem afinador",
    description:
      "Aprenda o método da quinta casa para afinar o violão de ouvido em poucos minutos, mesmo sem nenhum equipamento.",
    publishedAt: "2026-05-07",
    readingTime: 5,
    Content: ComoAfinarSemAfinador,
  },
  {
    slug: "drop-d-vs-afinacao-padrao",
    title: "Drop D vs Afinação Padrão: qual usar?",
    description:
      "Diferenças, vantagens e quando vale a pena trocar para Drop D no violão. Guia comparativo direto.",
    publishedAt: "2026-05-07",
    readingTime: 4,
    Content: DropDvsPadrao,
  },
  {
    slug: "afinador-online-vs-app",
    title: "Afinador online vs app de afinar: qual é melhor?",
    description:
      "Comparação honesta entre afinadores web e apps mobile. Precisão, latência, privacidade e quando preferir cada um.",
    publishedAt: "2026-05-07",
    readingTime: 5,
    Content: AfinadorOnlineVsApp,
  },
  {
    slug: "quando-trocar-cordas-violao",
    title: "Quando trocar as cordas do violão",
    description:
      "Sinais de que as cordas estão pedindo troca, frequência ideal por tipo de uso e cuidados para aumentar a durabilidade.",
    publishedAt: "2026-05-07",
    readingTime: 4,
    Content: QuandoTrocarCordas,
  },
  {
    slug: "como-treinar-ouvido-musical",
    title: "Como treinar o ouvido musical para afinar de ouvido",
    description:
      "Rotina de 15 minutos por dia para desenvolver ouvido relativo e afinar o violão sem aparelhos.",
    publishedAt: "2026-05-07",
    readingTime: 6,
    Content: ComoTreinarOuvido,
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
