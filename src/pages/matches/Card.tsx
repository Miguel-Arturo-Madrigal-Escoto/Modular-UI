import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';

export const Card = () => {
    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={() => console.info('swipe action triggered')}>
            Action name
          </SwipeAction>
        </LeadingActions>
      );
      
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            onClick={() => console.info('delete action triggered')}
          >
            Delete
          </SwipeAction>
        </TrailingActions>
      );

    return (
        <div className="h-full bg-gray-200 p-4">
        <SwipeableList>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}
        >
            <div className="relative max-w-md mx-auto md:max-w-2xl mt-16 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full flex justify-center">
                            <div className="relative">
                                <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                            </div>
                        </div>
                        <div className="w-full text-center mt-20">
                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">$400</span>
                                    <span className="text-sm text-slate-400">Salario</span>
                                </div>
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block tracking-wide text-slate-700">Presencial</span>
                                    <span className="text-sm text-slate-400">Modalidad</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="text-2xl text-slate-700 font-bold leading-normal">Aide Sarahi</h3>
                        <h4 className="text-2xl text-slate-700 leading-normal mb-1">Software Developer</h4>
                        <div className="text-xs mb-2 text-slate-400 font-bold uppercase">
                            Guadalajara, Jalisco
                        </div>
                    </div>
                    <div className="mt-6 py-6 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light leading-relaxed text-slate-600 mb-4"> About me of considerable range, Mike the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</p>
                                {/* <a href="" className="font-normal text-slate-700 hover:text-slate-400">Follow Account</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwipeableListItem>
        </SwipeableList>
        </div>
    )
}
