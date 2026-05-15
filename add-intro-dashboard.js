const fs = require('fs');

let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

const injection = `
                {/* LECTURA INTRODUCTORIA */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Column: Text Content */}
                        <div className="lg:col-span-8 prose prose-invert prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-h2:text-3xl prose-h2:text-white prose-h3:text-secondary prose-h3:text-xl prose-p:text-slate-400 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-secondary bg-slate-900/50 p-8 rounded-3xl border border-white/5 shadow-xl">
                            <div className="mb-12">
                                <div className="text-secondary font-black uppercase text-xs tracking-[0.5em] mb-3">Introducción al Master</div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4 text-white">
                                    MASTER EN IA AGÉNTICA CON PYTHON DESDE CERO
                                </h2>
                                <p className="text-xl text-slate-300 font-medium">
                                    El programa más completo para convertirte en Ingeniero de Agentes Autónomos de Inteligencia Artificial
                                </p>
                                <p className="text-lg text-slate-400 font-medium italic">
                                    Sin experiencia previa. Sin requisitos. Sin excusas.<br/>
                                    Desde la nada absoluta hasta construir sistemas que piensan, deciden y actúan por sí solos.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">ANTES DE EMPEZAR: LEE ESTO</h3>
                            <p>Este Master no es un temario. No es una lista de videos. No es un PDF que descargas y nunca abres.</p>
                            <p className="font-bold text-white text-xl my-6">Es un sistema de transformación.</p>
                            <p>Cuando termines, no habrás &quot;aprendido Python&quot;. Habrás construido agentes de inteligencia artificial autónomos con tus propias manos. Sabrás exactamente qué pasa dentro de cada línea de código, por qué funciona y cómo romperlo y arreglarlo cuando falle, porque fallará.</p>
                            <p>Pero antes de entrar al primer módulo, necesitas entender por qué este programa está diseñado como está. No es capricho. Es ciencia, historia y décadas de resultados probados.</p>
                            <p className="font-bold text-secondary">Tómate cinco minutos. Vale la pena.</p>

                            <h3 className="text-2xl font-bold text-white mt-16 mb-6 border-b border-white/10 pb-4">FILOSOFÍA: POR QUÉ ESTE MASTER FUNCIONA (Y LA MAYORÍA NO)</h3>
                            <p>Hay una pregunta incómoda que nadie hace al empezar un curso:</p>
                            <blockquote className="border-l-4 border-secondary pl-6 italic text-xl my-8 text-slate-300">
                                ¿Por qué la mayoría de la gente que empieza a &quot;aprender Python&quot; lo abandona?
                            </blockquote>
                            <p>No es por falta de inteligencia. No es porque sea difícil. Es porque la mayoría de los programas de formación están diseñados para transmitir información, no para crear comprensión real. Te dan los datos. Te hacen el examen. Y al cabo de tres semanas, no recuerdas nada porque tu cerebro nunca llegó a integrar lo que aprendiste.</p>
                            <p>Este Master hace algo diferente. Fusiona las metodologías de &quot;Aprendizaje&quot; más efectivas de la historia en un sistema único, donde cada una tapa las debilidades de las demás.</p>
                            <p className="mb-10">Así funciona:</p>

                            <div className="space-y-12">
                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">1.</span> APRENDIZAJE ACTIVO</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">John Dewey · Jean Piaget</p>
                                    <p>Leonardo da Vinci no aprendió anatomía leyendo libros. Diseccionó cadáveres. Dibujó máquinas que aún no existían. Mezcló química con arte, óptica con escultura. Benjamin Franklin aprendió a escribir copiando ensayos completos, desmontándolos frase por frase y reconstruyéndolos de memoria sin mirar el original.</p>
                                    <p>Dewey demostró que el aprendizaje ocurre cuando el estudiante actúa, no cuando escucha. Piaget fue más lejos: el cerebro no absorbe información, la construye activamente. Cada concepto nuevo que asimilas reorganiza las estructuras mentales que ya tienes.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> nunca leerás un concepto sin ponerlo en práctica de inmediato. Teoría seguida de ejercicio, siempre, sin excepciones. No hay teoría huérfana aquí.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">2.</span> REPETICIÓN ESPACIADA</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Hermann Ebbinghaus, 1885</p>
                                    <p>En 1885, el psicólogo alemán Hermann Ebbinghaus descubrió algo perturbador: después de aprender algo, olvidas el 70% en las siguientes 24 horas si no lo repasas. Tu cerebro descarta por defecto todo aquello que no usa.</p>
                                    <p>Pero descubrió también la solución: si repasas en intervalos crecientes (1 día, 3 días, 7 días, 21 días), la información se consolida en la memoria a largo plazo con un esfuerzo mínimo. Tu cerebro interpreta la repetición espaciada como una señal clara: &quot;esto aparece una y otra vez, debe ser importante, hay que guardarlo&quot;.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> los conceptos clave no se repiten de forma mecánica. Simplemente reaparecen integrados en ejercicios más complejos. Cuando en el Módulo 6 construyas tu primer agente, estarás repasando funciones de Python del Módulo 2, APIs del Módulo 4 y prompt engineering del Módulo 5, sin darte cuenta de que estás repasando.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">3.</span> APRENDIZAJE POR OBJETIVOS</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Peter Drucker</p>
                                    <p>Peter Drucker, el padre del management moderno, lo decía claro: no trabajes &quot;en general&quot;, trabaja hacia un resultado concreto y medible. Su sistema de &quot;OKR&quot; (Objectives and Key Results) cambió cómo las mejores empresas del mundo organizan su trabajo.</p>
                                    <p>El problema con la mayoría de los cursos es que el objetivo es vago: &quot;aprender Python&quot;, &quot;entender la IA&quot;. Eso no es un objetivo, es un deseo. Un objetivo tiene forma, tiene fecha y se puede tocar con las manos.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> no &quot;estudias Python&quot;. Estudias Python para que al final del Módulo 3 puedas escribir un script que lea un archivo CSV y genere un informe automático. No &quot;aprendes sobre LLMs&quot;. Aprendes sobre LLMs para que al final del Módulo 5 puedas enviar un prompt a GPT-4 y recibir una respuesta estructurada en JSON. Cada módulo termina con un artefacto real: algo que construiste, que funciona y que puedes enseñar.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">4.</span> MÉTODO FEYNMAN</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Richard Feynman</p>
                                    <p>Richard Feynman, premio Nobel de Física, tenía una regla que aplicaba sin piedad: si no puedes explicar algo de forma que un niño de 12 años lo entienda, no lo entiendes tú. No lo entiendes de verdad. Tienes la ilusión de que lo entiendes, que es diferente y mucho más peligroso.</p>
                                    <p>Su método tiene cuatro pasos: aprender, explicar con palabras simples, detectar los huecos en tu explicación, y simplificar hasta que no quede nada que no puedas justificar.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> al final de cada módulo encontrarás una sección llamada &quot;Explícalo como si tuvieras 12 años&quot;, donde debes reformular lo aprendido con tus propias palabras, sin jerga técnica, sin esconderte detrás de términos que suenan bien. Este no es un ejercicio menor: es el mecanismo más poderoso jamás descubierto para consolidar comprensión real.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">5.</span> MAYÉUTICA</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Sócrates, siglo V a.C.</p>
                                    <p>Sócrates no daba respuestas. Hacía preguntas. No preguntas triviales, sino preguntas que obligaban al interlocutor a examinar sus propias suposiciones, a descubrir contradicciones en su propio pensamiento, y a llegar por sí mismo a una verdad más profunda. Platón llamó a este método &quot;mayéutica&quot;: el arte de dar a luz ideas que ya estaban dentro de ti pero que aún no habías visto.</p>
                                    <p>Es el fundamento de todo pensamiento crítico. Y tiene 2.500 años de antigüedad porque funciona.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> cada módulo incluye &quot;Preguntas Socráticas&quot;: preguntas que no se responden buscando en Google, sino pensando. Preguntas diseñadas para que descubras por ti mismo las razones profundas detrás de cada concepto. Algunas te incomodarán. Eso es exactamente la idea.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">6.</span> FIRST PRINCIPLES THINKING</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Aristóteles · Elon Musk</p>
                                    <p>Aristóteles definió los &quot;primeros principios&quot; como las verdades fundamentales que no pueden descomponerse en nada más simple. Dos milenios después, Elon Musk popularizó este enfoque en el mundo moderno: en lugar de razonar por analogía (&quot;esto se hace así porque siempre se ha hecho así&quot;), desmontas el problema hasta sus componentes irreductibles y reconstruyes desde ahí.</p>
                                    <p>El resultado es que puedes llegar a soluciones que nadie más ve, precisamente porque no estás copiando el pensamiento de otro.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> antes de usar cualquier framework (LangChain, CrewAI, OpenAI Agents SDK), primero construirás un agente desde cero con Python puro. No porque sea más eficiente, sino porque necesitas entender qué hay debajo del framework. Solo quien entiende los &quot;First Principles&quot; puede luego usar las abstracciones con criterio y sin miedo.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">7.</span> APRENDIZAJE POR FRICCIÓN</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Nassim Taleb</p>
                                    <p>Nassim Taleb, autor de &quot;Antifrágil&quot;, demostró que los sistemas que se fortalecen con el estrés son superiores a los que simplemente resisten. El hueso que se fractura y suelda queda más denso que antes. El músculo que se rompe en el entrenamiento crece más fuerte. El cerebro que lucha con un problema que no entiende construye conexiones que el cerebro cómodo nunca forma.</p>
                                    <p>Aplicado al aprendizaje: los errores, la confusión temporal, la frustración de no entender algo a la primera, son exactamente lo que fija el conocimiento en tu cerebro. Un ejercicio que resuelves sin esfuerzo no te enseña nada. Un ejercicio que te obliga a pensar 20 minutos te transforma.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> algunos ejercicios están diseñados para que falles la primera vez. No es un defecto del programa. Es una característica deliberada.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">8.</span> MENTORES Y MODELADO</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Tradición gremial medieval</p>
                                    <p>En la Edad Media, un aprendiz de herrero no leía libros sobre herrería. Se sentaba al lado del maestro, observaba cada golpe, imitaba cada movimiento, y poco a poco desarrollaba su propia maestría. Aristóteles fue mentor de Alejandro Magno. Warren Buffett fue discípulo de Benjamin Graham. Este patrón de aprendizaje por imitación consciente es el más antiguo y posiblemente el más efectivo de todos.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> cada framework y cada técnica se presenta con código real de profesionales reales. No inventamos ejemplos artificiales diseñados para que todo salga bien. Usamos los mismos patrones que usan los ingenieros de OpenAI, Google y Meta en producción.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">9.</span> TRIAL AND ERROR ESTRUCTURADO</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Método científico · Lean Startup</p>
                                    <p>El método científico no es otra cosa que error sistematizado: hipótesis, experimento, observación, ajuste. No es fallar sin rumbo, es fallar con intención y aprender con precisión. Eric Ries lo adaptó al mundo de las startups con &quot;Lean Startup&quot;: construye rápido, mide, aprende, itera.</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> cada proyecto sigue este ciclo. Escribes código, lo ejecutas, observas qué pasa, ajustas y vuelves a ejecutar. No existe &quot;hacer el ejercicio bien a la primera&quot;. Existe iterar hasta que funcione, y en el proceso, entender por qué no funcionaba antes. Eso es lo que te convierte en ingeniero.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><span className="text-secondary">10.</span> APRENDIZAJE CONTEMPLATIVO</h4>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Estoicos · Tradiciones orientales</p>
                                    <p>Séneca, Marco Aurelio y la tradición Zen comparten una idea que el mundo moderno ha olvidado casi por completo: el conocimiento que no se integra mediante reflexión silenciosa se pierde. No basta con hacer. Hay que parar, observar lo que has hecho y preguntarte con honestidad: ¿qué he aprendido realmente? ¿Qué sigo sin entender? ¿Qué asumo que entiendo pero que en realidad no he puesto a prueba?</p>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                                        <p className="m-0"><strong className="text-white">En este Master:</strong> al final de cada módulo hay un espacio de &quot;Reflexión&quot; donde debes escribir tres cosas: lo que has aprendido, lo que aún te confunde, y lo que quieres investigar por tu cuenta. Este hábito, si lo mantienes de forma honesta, será más valioso que el propio contenido del Master.</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mt-16 mb-6 border-b border-white/10 pb-4">RECURSOS DE REFERENCIA</h3>
                            <p>Este programa integra y referencia los siguientes recursos. No necesitas consultarlos todos. Están aquí para que sepas de dónde proviene cada recomendación y para que puedas profundizar en cualquier área cuando lo necesites.</p>
                            
                            <h4 className="text-lg font-bold text-white mt-8 mb-4">Cursos de Python desde cero (Español)</h4>
                            <ul className="space-y-3 mb-4">
                                <li><a href="https://www.freecodecamp.org/espanol/news/aprende-a-programar-en-python-desde-cero-curso-completo-gratis/" target="_blank" rel="noopener noreferrer">freeCodeCamp Español (4.5h)</a></li>
                                <li><a href="https://es.coursera.org/learn/introduccion-python" target="_blank" rel="noopener noreferrer">Coursera — Austral</a></li>
                                <li><a href="https://platzi.com/cursos/python-fundamentos" target="_blank" rel="noopener noreferrer">Platzi — Fundamentos</a></li>
                                <li><a href="https://www.youtube.com/watch?v=QPAO-31QtQ8" target="_blank" rel="noopener noreferrer">GroverTec YouTube (7h)</a></li>
                                <li><a href="https://cursopython.dev/" target="_blank" rel="noopener noreferrer">midudev</a></li>
                                <li><a href="https://cursa.app/es/curso-gratis/python-desde-0-bcef" target="_blank" rel="noopener noreferrer">Cursa.app (20h)</a></li>
                                <li><a href="https://www.datacamp.com/es/blog/how" target="_blank" rel="noopener noreferrer">DataCamp guía</a></li>
                            </ul>
                        </div>

                        {/* Right Column: Activities (Sticky Sidebar) */}
                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-10 space-y-6">
                                <h4 className="text-lg font-black tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-secondary" />
                                    Panel de Acción
                                </h4>

                                {/* Flashcards Widget */}
                                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 hover:border-secondary/50 transition-colors shadow-lg group">
                                    <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h5 className="font-bold text-white mb-2 text-lg">Flashcards de la Intro</h5>
                                    <p className="text-sm text-slate-400 mb-6">Recordatorio rápido de las 10 metodologías clave que guiarán tu aprendizaje.</p>
                                    <button className="w-full py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                        Repasar Conceptos
                                    </button>
                                </div>

                                {/* Quizzes Widget */}
                                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 hover:border-primary/50 transition-colors shadow-lg group">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <h5 className="font-bold text-white mb-2 text-lg">Quiz Diagnóstico</h5>
                                    <p className="text-sm text-slate-400 mb-6">Evalúa tu mentalidad de aprendizaje antes de empezar el código real.</p>
                                    <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                        Iniciar Quiz
                                    </button>
                                </div>

                                {/* Exercises Widget */}
                                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-colors shadow-lg group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <h5 className="font-bold text-white mb-2 text-lg">Ejercicio de Compromiso</h5>
                                    <p className="text-sm text-slate-400 mb-6">Escribe tu primer OKR (Objective and Key Result) para este programa.</p>
                                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors">
                                        Completar Actividad
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
`;

const targetString = '{/* Grilla Real de Módulos */}';
content = content.replace(targetString, injection + '\n                ' + targetString);

fs.writeFileSync('src/app/dashboard/page.tsx', content);
