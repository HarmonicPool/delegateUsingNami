# delegate-using-nami
##### brought to you by Harmonic Pool

## Contents
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Usage](#Usage)
    - [basic usage](#basic_delegation)
    - [with some logic](#deleg_with_logic)
    - [other examples](#oth_examples)
- [Support Harmonic](#Support)

## Prerequisites

make sure to enable web-assembly if not configured by default.

You may find some help in the [documentation/knownIssues/allowing_web-assembly.md](https://github.com/HarmonicPool/delegateUsingNami/blob/main/documentation/knownIssues/allowing_web-assembly.md) folder

## Installation

run the following in your project directory

```bash
npm install https://github.com/HarmonicPool/delegateUsingNami
```

## Usage

<a name="basic_delegation">
</a>
<h4>basic delegation functionality</h4>

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
<a name="deleg_with_logic">
</a>
<h4>In combination with NamiInterface static class</h4>


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
<a name="oth_examples">
</a>
<h4>other examples</h4>

check the [documentation/examples](https://github.com/HarmonicPool/delegateUsingNami/tree/main/documentation/examples) folder for more

<a name="Support">
</a>
<h2>Support Harmonic</h2>


Any code correction you may find useful is a great form of support for all the Cardano community, you can send them to the [Harmonic Pool mail](mailto:harmonic.pool@protonmail.com)


other great forms to show support is by [delegating to Harmonic Pool](https://harmonicpool.on.fleek.co/delegate/)


or donating ADA to the following address that delegates to Harmonic:

```addr1qxyryaacjdwau64wyf5truhq2akuc50dunrzlpj82pcjjkwpcdn8a48cpt55dp9d7wc8khg8aksheu62u4nhrdtgddeqd4r83d```

any of the above will be really appreciated \<3
