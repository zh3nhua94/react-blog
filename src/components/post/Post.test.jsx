import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Post from "./Post";

describe("Post Component", () => {
	const samplePost = {
		_id: "1",
		photo: "sample.jpg",
		categories: ["Category1", "Category2"],
		title: "Sample Post Title",
		desc: "Sample Post Description",
	};

	test("renders post information correctly", () => {
		render(
			<MemoryRouter>
				<Post post={samplePost} />
			</MemoryRouter>
		);

		// Check if post image is rendered and has the correct source
		const postImage = screen.getByTestId("postImg");
		expect(postImage).toBeInTheDocument();
		expect(postImage).toHaveAttribute("src", `${process.env.REACT_APP_PUBLIC_FOLDER}${samplePost.photo}`);

		// Check if post categories are rendered and linked
		samplePost.categories.forEach((c, index) => {
			const categoryLink = screen.getByRole("link", { name: c });
			expect(categoryLink).toBeInTheDocument();
			expect(categoryLink).toHaveAttribute("href", `/?cat=${c}#home`);
		});

		// Check if post title is rendered and linked
		const postTitleLink = screen.getByRole("link", { name: samplePost.title });
		expect(postTitleLink).toBeInTheDocument();
		expect(postTitleLink).toHaveAttribute("href", `/post/${samplePost._id}`);

		// Check if post description is rendered
		const postDescription = screen.getByText(samplePost.desc);
		expect(postDescription).toBeInTheDocument();
	});
});
