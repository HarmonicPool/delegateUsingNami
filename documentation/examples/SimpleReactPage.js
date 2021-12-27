import React from 'react'

import { delegateUsingNami } from "@harmonicpool/delegate-using-nami";
import NamiInterface from '@harmonicpool/delegate-using-nami/cardano/nami';

export default class Home extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      currentDelegation: {},
      namiHasBeenInitialized: false
    }
  }

  async componentDidMount()
  {
    await window.cardano.enable();

    NamiInterface.init("<your blockforst api key>");

    this.setState({
      currentDelegation: await NamiInterface.getCurrentDelegation(),
      namiHasBeenInitialized: true
    })
  }

  render()
  {

    return (
      <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >

        {
          !this.state.namiHasBeenInitialized ?
            <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "5vh"
            }}
            >looking for Nami... 👀</p>
          :
            (
            this.state.currentDelegation.pool_id === "<your pool id>" ?
              <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "5vh"
              }}
              >Thank you for your support &#9829;</p>
            :
              <button 
              onClick={() => delegateUsingNami(
                "<your pool id>",
                "<your blockforst api key>"
              )}
              >
                Delegate
              </button>
            )
          }
        
      </div>
    )
  }
}