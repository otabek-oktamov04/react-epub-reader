import { ReactReader } from '../lib/index'
import useLocalStorageState from 'use-local-storage-state'

import { DEMO_URL, DEMO_NAME } from '../components/config'
import { Example } from '../components/Example'
import { useEffect, useRef, useState } from 'react'
import type { Contents, NavItem, Rendition } from 'epubjs'

interface IProps {
  url: string
}

export const Persist = ({ url }: IProps) => {
  const toc = useRef<NavItem[]>([])
  const [page, setPage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const rendition = useRef<Rendition | undefined>(undefined)
  const [fontSize, setFontSize] = useState(100)
  const [selectedStyles, setSelectedStyles] = useState({
    font1: true,
    font2: false,
  })

  const [location, setLocation] = useLocalStorageState<string | number>(
    'persist-location',
    {
      defaultValue: 0,
    }
  )

  useEffect(() => {
    rendition.current?.themes.fontSize(`${fontSize}%`)
  }, [fontSize])

  return (
    <Example title="">
      <ReactReader
        url={DEMO_URL}
        epubOptions={{
          flow: 'paginated',
        }}
        swipeable
        title="Yoki - Ebook reader"
        location={location}
        tocChanged={(_toc) => (toc.current = _toc)}
        locationChanged={(loc: string) => {
          setLocation(loc)
          if (rendition.current && toc.current) {
            const { displayed, href } = rendition.current.location.start
            const chapter = toc.current.find((item) => item.href === href)
            setPage(`Page ${displayed.page} of ${displayed.total}`)
          }
        }}
        getRendition={(_rendition: Rendition) => {
          rendition.current = _rendition
          _rendition.hooks.content.register((contents: Contents) => {
            const body = contents.window.document.querySelector('body')
            if (body) {
              body.oncontextmenu = () => {
                return false
              }
            }
          })
          rendition.current.themes.fontSize(
            `${localStorage.getItem('fontSize') || fontSize}%`
          )
        }}
      />
      <div
        style={{
          position: 'absolute',

          top: '15px',
          right: '10px',

          zIndex: 99,
        }}
      >
        <img
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: 'pointer',
          }}
          src="/files/settings.svg"
          width="25px"
          height="25px"
        />
      </div>

      <div
        style={{
          position: 'absolute',
          background: 'white',
          bottom: '0',
          width: '100vw',
          height: '50vh',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          padding: '14px',
          zIndex: 99,
          transition: 'transform 0.4s ease-in-out',
          boxShadow: ' 0px -1px 13px 1px #0b3d3433',
          display: isOpen ? 'block' : 'none',
        }}
      >
        <div>
          <p>Fon rangi</p>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '10px',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="color selected"
              data-color="#ffffff"
              style={{
                background: '#ffffff',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #dadfdd',
                width: '20vw',
                boxSizing: 'border-box',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Aa
            </div>
            <div
              className="color selected"
              data-color="#ffffff"
              style={{
                background: '#ffffff',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #dadfdd',
                width: '20vw',
                boxSizing: 'border-box',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Aa
            </div>
            <div
              className="color selected"
              data-color="#ffffff"
              style={{
                background: '#ffffff',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #dadfdd',
                width: '20vw',
                boxSizing: 'border-box',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Aa
            </div>
            <div
              className="color selected"
              data-color="#ffffff"
              style={{
                background: '#ffffff',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #dadfdd',
                width: '20vw',
                boxSizing: 'border-box',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Aa
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <p>Yozuv Kattaligi</p>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '10px',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="color selected"
              onClick={() => {
                if (fontSize < 400) {
                  setFontSize(fontSize + 10)
                  localStorage.setItem('fontSize', String(fontSize))
                  setSelectedStyles({
                    font1: true,
                    font2: false,
                  })
                }
              }}
              style={{
                background: '#FAFCFB',
                padding: '10px',
                borderRadius: '8px',
                width: '50vw',
                boxSizing: 'border-box',
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedStyles.font1
                  ? '1px solid #FFFF00'
                  : '1px solid #dadfdd',
              }}
            >
              A++
            </div>

            <div
              className="color"
              onClick={() => {
                if (fontSize > 50) {
                  setFontSize(fontSize - 10)
                  localStorage.setItem('fontSize', String(fontSize))
                  setSelectedStyles({
                    font1: false,
                    font2: true,
                  })
                }
              }}
              style={{
                background: '#FAFCFB',
                padding: '10px',
                borderRadius: '8px',
                width: '50vw',
                boxSizing: 'border-box',
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedStyles.font2
                  ? '1px solid #FFFF00'
                  : '1px solid #dadfdd',
              }}
            >
              A--
            </div>
          </div>
        </div>
      </div>

      {page && (
        <div
          style={{
            position: 'absolute',
            background: 'white',
            bottom: '20px',
            width: '50vw',
            right: '25vw',

            borderRadius: '10px',

            zIndex: 98,
            boxShadow: ' 0px -1px 13px 1px #0b3d3433',
            textAlign: 'center',
            padding: '5px',
            fontWeight: '600',
          }}
        >
          {page}
        </div>
      )}
    </Example>
  )
}
