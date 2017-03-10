import { trigger, state, animate, style, transition } from '@angular/core';

export function routerTransition() {
    return slideToTop();
}

function slideToRight() {
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%'})),
        state('*', style({position: 'fixed', width: '100%'})),
        transition(':enter', [
            style({transform: 'translateX(-100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
        ])
    ]);
}

function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%'})),
        state('*', style({position: 'fixed', width: '100%'})),
        transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
        ])
    ]);
}

function slideToBottom() {
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%', height: '100%'})),
        state('*', style({position: 'fixed', width: '100%', height: '100%'})),
        transition(':enter', [
            style({transform: 'translateY(-100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
        ])
    ]);
}

function slideToTop() {
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%', height: '100%'})),
        state('*', style({position: 'static', width: 'auto', height: 'auto'})),
        transition(':enter', [
            style({transform: 'translateY(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(50%)'})),
        ]),
        transition(':leave', [
            style({opacity: .7, transform: 'translateY(0%)'}),
            animate('0.5s ease-in-out', style({opacity: 0, transform: 'translateY(-100%)'}))
        ])
    ]);
}

// function fadeIn() {
//     return trigger('routerTransition', [
//         state('void', style({op}) ),
//         state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
//         transition(':enter', [
//             style({transform: 'translateY(100%)'}),
//             animate('0.5s ease-in-out', style({transform: 'translateY(50%)'})),
//         ]),
//         transition(':leave', [
//             style({transform: 'translateY(0%)'}),
//             animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
//         ])
//     ]);
// }
