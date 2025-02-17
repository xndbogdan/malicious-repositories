import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function LearnHero({}: Props) {
  return (
    <section className="p-5 w-full max-w-6xl mx-auto ">
        <div className="border rounded-lg border-teal p-5 bg-gradient-to-r from-darkPrimaryGreen via-lightPrimaryGreen to-teal">
            <div className="relative">
                <p className="bg-gradient-to-r from-yellow via-lightPrimaryGreen to-teal bg-clip-text font-display text-md uppercase font-bold text-transparent">Learn</p>
                <p className="mt-2 mb-5 text-4xl md:text-6xl tracking-tight text-slate-400">Knowledgebase Placeholder</p>
                <input className="bg-transparent border-b border-slate-400 text-base md:text-lg text-slate-400 focus:outline-none" type="text" placeholder="Search" />
                <button><MagnifyingGlassIcon width={20} height={20} className="text-white" /></button>

            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between m-0 p-0 lg:space-x-10">
            {/* Index */}
            <div className="hidden lg:relative lg:block lg:flex-none sticky h-[calc(100vh] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
                <nav className="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16">
                    <ul role="list" className="space-y-9">
                        <li>
                            <h2 className="font-display font-medium text-slate-900 dark:text-white">Introduction</h2>
                            <ul role="list" className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                                <li className="relative">
                                    <Link className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500" href="/">What is Free Bling?</Link>
                                </li>
                                <li className="relative">
                                    <Link className="learnLink" href="/docs/installation">Getting started</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="font-display font-medium text-slate-900 dark:text-white">Giveaways</h2>
                            <ul role="list" className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                            <li className="relative"><Link className="learnLink" href="/docs/understanding-caching">Setting up a giveaway</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/predicting-user-behavior">Running a Facebook Contest</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/basics-of-time-travel">Running a YouTube Contest</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/introduction-to-string-theory">Giveaway Tips & Tricks</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/the-butterfly-effect">Promoting a Contest on Twitter</Link></li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="font-display font-medium text-slate-900 dark:text-white">Instant Rewards</h2>
                            <ul role="list" className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="font-display font-medium text-slate-900 dark:text-white">Instant Rewards</h2>
                            <ul role="list" className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            <li className="relative"><Link className="learnLink" href="/docs/writing-plugins">Drawing Rewards Winners</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>    

            {/* Content         */}
            <div className="flex-1 min-w-0 py-5 md:py-20">
                <h2 className="text-2xl py-2">What is Free Bling?</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nibh at sapien ornare elementum. Quisque vestibulum congue gravida. Nunc luctus, mi vel imperdiet congue, ligula velit laoreet elit, id efficitur justo lorem vel ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse vehicula in leo at ultricies. In orci ligula, posuere sit amet bibendum vel, ultricies quis sem. Maecenas et orci est. Cras ac rhoncus velit, viverra fermentum eros. Donec tincidunt magna sit amet dolor consectetur, ut condimentum libero viverra. Vivamus tincidunt turpis pulvinar nunc feugiat, ac pellentesque elit mollis. Vivamus consectetur sollicitudin turpis, quis porta urna ornare id. Curabitur placerat sagittis iaculis.</p>
                <p>Donec pharetra arcu ex, ut molestie enim bibendum et. Suspendisse egestas tempus lorem ac pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec lobortis ligula nisl, nec auctor lacus dignissim eu. Ut nibh justo, fringilla a semper ac, sodales sed nulla. Mauris facilisis gravida velit vitae cursus. Donec eget nulla massa. Etiam efficitur imperdiet dui, vel imperdiet velit accumsan eu. Sed porta sit amet turpis a porta. Fusce ultrices felis ut mauris facilisis tincidunt. Nunc convallis mi tristique ultrices gravida. Aenean vel erat quis velit gravida laoreet. Praesent venenatis varius congue. Vestibulum dignissim massa nec odio hendrerit condimentum. Ut ac neque vitae eros viverra iaculis eu vel turpis.</p>
                <p>Sed facilisis volutpat mauris et rutrum. Vestibulum sit amet sagittis massa, quis aliquet lorem. Pellentesque vestibulum mollis ex eget volutpat. Fusce cursus condimentum tortor id dapibus. Mauris feugiat et enim non cursus. Maecenas nec congue nisl. Vestibulum id magna non risus tincidunt pulvinar. Sed venenatis ipsum erat, a semper felis iaculis sit amet. Curabitur pharetra velit et dui ultrices, eu fringilla odio semper. Integer sit amet convallis neque. Aliquam bibendum, metus vitae lobortis imperdiet, tortor orci hendrerit erat, sit amet fermentum purus risus eu ex. Aenean non dui ut dui hendrerit fermentum. Donec eu fringilla mi, in viverra sapien.</p>
                <p>Sed rutrum, lorem at pellentesque dapibus, ipsum erat viverra metus, vitae tincidunt sapien turpis id nibh. Vivamus vel vehicula leo, id gravida eros. Mauris nec molestie arcu. Cras leo tellus, vehicula eu turpis sit amet, eleifend sollicitudin enim. Nunc at porta velit. In malesuada ante non lorem semper interdum. Aenean dignissim tristique ante, et tincidunt tellus cursus in. Cras at congue lacus.</p>
                <p>Sed tincidunt pellentesque pretium. In interdum ante risus, ut lacinia libero pellentesque molestie. In pretium augue justo, quis finibus neque cursus id. Quisque non elementum ante. Nam mollis orci bibendum ipsum aliquet gravida. Maecenas lacinia finibus nunc, nec ornare nulla vehicula sed. Proin magna ex, consectetur sed vulputate eu, elementum eu ligula. Vestibulum auctor tortor ac sagittis ornare. Suspendisse aliquam molestie volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue mi non molestie porta. Donec porttitor, elit varius dignissim vestibulum, sapien lacus porta ante, ac laoreet eros lorem vel nulla. Etiam a mauris eleifend, condimentum leo ut, vulputate nisl. In volutpat ipsum eget ante finibus mollis. Morbi at feugiat ex. Sed posuere ac magna at faucibus.</p>
                <p>Nulla tellus tellus, vehicula at tincidunt ut, fringilla eu est. Morbi fermentum velit ligula, vitae dictum diam eleifend eu. Suspendisse ac lacus feugiat, sodales turpis ac, euismod arcu. Duis vulputate libero risus, non scelerisque tortor tempor ut. Quisque velit nulla, posuere molestie sem nec, volutpat ornare urna. Quisque condimentum id tellus quis facilisis. Donec vestibulum, nulla non sodales condimentum, nunc dolor aliquam metus, in malesuada magna elit in metus. Aenean a neque non neque posuere consectetur. Aliquam non volutpat mauris. Maecenas molestie dolor et sapien mattis, sed scelerisque erat tempus. Cras odio libero, interdum quis congue eu, tempor sit amet purus. Suspendisse finibus arcu a sapien bibendum, sed aliquam libero ultrices. Duis hendrerit sodales scelerisque. Duis sagittis orci et enim maximus elementum. Vestibulum nec massa lacinia risus rhoncus efficitur.</p>
                <p>Fusce nunc urna, ullamcorper a ultricies sit amet, tempus quis turpis. Donec vulputate purus vel tortor eleifend feugiat. Morbi dignissim sed metus non faucibus. Quisque elementum arcu at erat accumsan, sed commodo enim dapibus. Suspendisse potenti. Nam faucibus faucibus libero, rutrum venenatis lacus feugiat sed. Nullam sit amet erat augue. In sodales, nisi nec suscipit porta, erat augue fringilla risus, a scelerisque tellus ligula a dui. Donec hendrerit mi sodales tortor tristique lacinia. Suspendisse nec rutrum diam. Proin et ipsum lorem. Ut porttitor eu mauris iaculis luctus.</p>
                <p>Morbi congue nulla mauris, eu aliquam augue dignissim vel. Vivamus sodales ultrices elit, eu condimentum ante. Vivamus maximus odio at mollis ornare. Nunc pharetra odio sed quam malesuada, a sodales est dictum. Aenean quis odio non neque consectetur porta rhoncus in sem. In nec velit tristique risus vehicula venenatis. Sed justo tellus, congue ac neque iaculis, mattis porta ligula. Curabitur non lorem a nisl laoreet hendrerit. Nunc quis pretium odio. Donec vel odio mattis leo congue pellentesque eget a ligula.</p>
            </div>
        </div>
            
        
    </section>
  )
}

export default LearnHero