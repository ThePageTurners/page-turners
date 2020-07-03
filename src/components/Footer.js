import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Ripples from 'react-ripples';

class Footer extends Component {
	constructor() {
		super();
		this.state = {
			members: [
				{
					link: 'https://github.com/daibhidhdwaum',
					person: 'daibhidhdwaum'
				},
				{
					link: 'https://github.com/vigyan-k',
					person: 'vigyan-k'
				},
				{
					link: 'https://github.com/OksanaSam',
					person: 'OksanaSam'
				},
				{
					link: 'https://github.com/amay-zingg',
					person: 'amay-zingg'
				}
			]
		};
	}

	render() {
		let github = <FontAwesomeIcon icon={faGithub} size="1x" />;

		return (
			<footer>
				<div className="groupMembers wrapper">
					<h3>Group Project By:</h3>
					<ul>
						{this.state.members.map((item,index) => {
							return (
								<li key={index}>
									<Ripples color="#f1f8f8" during={1200}>
										<a href={item.link}>
											{github} {item.person}
										</a>
									</Ripples>
								</li>
							);
						})}
					</ul>
				</div>
			</footer>
		);
	}
}

export default Footer;
