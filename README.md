# delegate-using-nami
##### brought to you by Harmonic Pool

## Contents
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Usage](#Usage)
    - [basic usage](#basic delegation functionality)
    - [with some logic](#In combination with NamiInterface static class)
    - [other examples](#other examples)
- [Support Harmonic](#Support Harmonic)

\
## Prerequisites

make sure to enable web-assembly if not configured by default.

You may find some help in the [documentation/knownIssues/allowing_web-assembly.md]() folder

## Installation

run the following in your project directory

```bash
npm install https://github.com/HarmonicPool/delegateUsingNami
```

## Usage

#### basic delegation functionality

```js
/*... other imports ...*/
import { delegateUsingNami } from "@harmonicpool/delegate-using-nami";

/*...*/

delegateUsingNami(
    "<your pool id>",
    "<your blockforst api key>"
);

/*...*/
```

#### In combination with NamiInterface static class

```js
/*... other imports ...*/
import { delegateUsingNami } from "@harmonicpool/delegate-using-nami";
import NamiInterface from '@harmonicpool/delegate-using-nami/cardano/nami';

/*...*/

async function myDelegationFunction()
{
    await NamiInterface.init("<your blockforst api key>");

    const currentUserDelegation = await NamiInterface.getCurrentDelegation();

    if( currentUserDelegation.pool_id === "<your pool id>" )
    {
        /* thank your delegator*/
    }
    else
    {
        delegateUsingNami(
            "<your pool id>",
            "<your blockforst api key>"
        );
    }
}

/*...*/
```

#### other examples
check the [documentation/examples]() folder for more


## Support Harmonic

Any code correction you may find usefull are a great form of support for all the Cardano community, you can send them tho the [Harmonic Pool mail](mailto:harmonic.pool@protonmail.com?subject=delegate-using-nami package code suggestion)

other great forms to show support is by [delegating to Harmonic Pool](https://harmonicpool.on.fleek.co/delegate/)

or donating ADA to the following address that delegates to Harmonic:

```addr1qxyryaacjdwau64wyf5truhq2akuc50dunrzlpj82pcjjkwpcdn8a48cpt55dp9d7wc8khg8aksheu62u4nhrdtgddeqd4r83d```

any of the above will be really appreciated \<3
